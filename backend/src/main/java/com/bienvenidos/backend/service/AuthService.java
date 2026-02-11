package com.bienvenidos.backend.service;

import com.bienvenidos.backend.dto.AuthRequests;
import com.bienvenidos.backend.entity.AppUser;
import com.bienvenidos.backend.repository.AppUserRepository;
import com.bienvenidos.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;
import java.util.Random;

@Service
public class AuthService {
  private final AppUserRepository users;
  private final PasswordEncoder encoder;
  private final JwtService jwt;
  private final EmailService emailService;
  private final InviteService inviteService;
  private final boolean requireInviteToken;

  public AuthService(
      AppUserRepository users,
      PasswordEncoder encoder,
      JwtService jwt,
      EmailService emailService,
      InviteService inviteService,
      @Value("${app.invites.requireToken:true}") boolean requireInviteToken
  ) {
    this.users = users;
    this.encoder = encoder;
    this.jwt = jwt;
    this.emailService = emailService;
    this.inviteService = inviteService;
    this.requireInviteToken = requireInviteToken;
  }

  @Transactional
  public String signup(AuthRequests.SignupRequest req) {
    String normalizedPhone = req.phone() != null ? req.phone().replaceAll("[^0-9]", "").trim() : null;

    // Validate that both email and phone are provided
    if (req.email() == null || req.email().isBlank()) {
      throw new IllegalArgumentException("Email is required");
    }
    if (normalizedPhone == null || normalizedPhone.isBlank()) {
      throw new IllegalArgumentException("Phone is required");
    }
    
    // Check if email or phone already registered
    if (users.existsByEmailIgnoreCase(req.email())) {
      throw new IllegalArgumentException("Email already registered");
    }
    if (users.existsByPhone(normalizedPhone)) {
      throw new IllegalArgumentException("Phone number already registered");
    }

    // Create user
    AppUser u = new AppUser();
    u.setEmail(req.email().trim().toLowerCase());
    u.setPhone(normalizedPhone);
    u.setFirstName(req.firstName() != null ? req.firstName().trim() : "");
    u.setLastName(req.lastName() != null ? req.lastName().trim() : "");
    u.setPasswordHash(encoder.encode(req.password()));
    u.setEmailVerified(false);
    
    // Generate verification code (6 digits)
    String verificationCode = String.format("%06d", new Random().nextInt(1000000));
    u.setVerificationCode(verificationCode);
    u.setVerificationCodeExpiry(Instant.now().plusSeconds(15 * 60)); // 15 minutes
    
    users.save(u);

    if (requireInviteToken) {
      // Consumed inside the same transaction so one invite can create only one account.
      inviteService.consumeInvite(req.inviteToken(), u.getId());
    }
    
    // Send verification email
    emailService.sendVerificationEmail(u.getEmail(), verificationCode);

    // Return a temporary token that allows only /verify endpoint
    // Or return null/empty to force verification first
    return "UNVERIFIED:" + u.getId();
  }

  public String verifyEmail(AuthRequests.VerifyEmailRequest req) {
    AppUser u = users.findByEmailIgnoreCase(req.email())
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    // Check if code is expired
    if (u.getVerificationCodeExpiry() == null || Instant.now().isAfter(u.getVerificationCodeExpiry())) {
      throw new IllegalArgumentException("Verification code expired");
    }

    // Check if code matches
    if (!u.getVerificationCode().equals(req.code())) {
      throw new IllegalArgumentException("Invalid verification code");
    }

    // Mark email as verified
    u.setEmailVerified(true);
    u.setVerificationCode(null);
    u.setVerificationCodeExpiry(null);
    users.save(u);

    return jwt.issueToken(u.getId(), u.getEmail());
  }

  public String login(AuthRequests.LoginRequest req) {
    // Validate that at least email or phone is provided
    if ((req.email() == null || req.email().isBlank()) && (req.phone() == null || req.phone().isBlank())) {
      throw new IllegalArgumentException("Either email or phone must be provided");
    }
    
    AppUser u = null;
    
    // Try to find by email first, then by phone
    if (req.email() != null && !req.email().isBlank()) {
      u = users.findByEmailIgnoreCase(req.email()).orElse(null);
    } else if (req.phone() != null && !req.phone().isBlank()) {
      u = users.findByPhone(req.phone().replaceAll("[^0-9]", "")).orElse(null);
    }
    
    if (u == null) {
      throw new IllegalArgumentException("Invalid credentials");
    }

    if (!encoder.matches(req.password(), u.getPasswordHash())) {
      throw new IllegalArgumentException("Invalid credentials");
    }

    // Keep legacy users working: only block when account is explicitly pending verification.
    if (Boolean.FALSE.equals(u.getEmailVerified()) && u.getVerificationCode() != null) {
      throw new IllegalArgumentException("Email not verified. Please verify your email first.");
    }

    String identifier = u.getEmail() != null ? u.getEmail() : u.getPhone();
    return jwt.issueToken(u.getId(), identifier);
  }
}

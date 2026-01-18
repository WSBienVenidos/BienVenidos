package com.bienvenidos.backend.service;

import com.bienvenidos.backend.dto.AuthRequests;
import com.bienvenidos.backend.entity.AppUser;
import com.bienvenidos.backend.repository.AppUserRepository;
import com.bienvenidos.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
  private final AppUserRepository users;
  private final PasswordEncoder encoder;
  private final JwtService jwt;

  public AuthService(AppUserRepository users, PasswordEncoder encoder, JwtService jwt) {
    this.users = users;
    this.encoder = encoder;
    this.jwt = jwt;
  }

  @Transactional
  public String signup(AuthRequests.SignupRequest req) {
    if (users.existsByEmailIgnoreCase(req.email())) {
      throw new IllegalArgumentException("Email already registered");
    }

    AppUser u = new AppUser();
    u.setEmail(req.email().trim().toLowerCase());
    u.setPasswordHash(encoder.encode(req.password()));
    users.save(u);

    return jwt.issueToken(u.getId(), u.getEmail());
  }

  public String login(AuthRequests.LoginRequest req) {
    AppUser u = users.findByEmailIgnoreCase(req.email())
        .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

    if (!encoder.matches(req.password(), u.getPasswordHash())) {
      throw new IllegalArgumentException("Invalid email or password");
    }

    return jwt.issueToken(u.getId(), u.getEmail());
  }
}

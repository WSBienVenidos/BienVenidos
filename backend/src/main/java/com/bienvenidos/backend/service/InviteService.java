package com.bienvenidos.backend.service;

import com.bienvenidos.backend.entity.InviteToken;
import com.bienvenidos.backend.repository.InviteTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.UUID;

@Service
public class InviteService {
  private final InviteTokenRepository invites;
  private final SecureRandom secureRandom = new SecureRandom();
  private final long expirationMinutes;

  public InviteService(
      InviteTokenRepository invites,
      @Value("${app.invites.expirationMinutes:10080}") long expirationMinutes
  ) {
    this.invites = invites;
    this.expirationMinutes = expirationMinutes;
  }

  public record GeneratedInvite(String token, Instant expiresAt) {}

  @Transactional
  public GeneratedInvite createInvite(UUID inviterId) {
    String token = generateToken();
    InviteToken invite = new InviteToken();
    invite.setTokenHash(hashToken(token));
    invite.setCreatedByUserId(inviterId);
    invite.setExpiresAt(Instant.now().plusSeconds(expirationMinutes * 60L));
    invites.save(invite);
    return new GeneratedInvite(token, invite.getExpiresAt());
  }

  public boolean isTokenValid(String token) {
    if (token == null || token.isBlank()) return false;
    InviteToken invite = invites.findByTokenHash(hashToken(token)).orElse(null);
    if (invite == null) return false;
    if (invite.getUsedAt() != null) return false;
    return !Instant.now().isAfter(invite.getExpiresAt());
  }

  @Transactional
  public void consumeInvite(String token, UUID usedByUserId) {
    if (token == null || token.isBlank()) {
      throw new IllegalArgumentException("Invitation token is required");
    }

    InviteToken invite = invites.findForUpdateByTokenHash(hashToken(token))
        .orElseThrow(() -> new IllegalArgumentException("Invalid invitation link"));

    if (invite.getUsedAt() != null) {
      throw new IllegalArgumentException("Invitation link has already been used");
    }
    if (Instant.now().isAfter(invite.getExpiresAt())) {
      throw new IllegalArgumentException("Invitation link has expired");
    }

    invite.setUsedAt(Instant.now());
    invite.setUsedByUserId(usedByUserId);
    invites.save(invite);
  }

  private String generateToken() {
    byte[] bytes = new byte[32];
    secureRandom.nextBytes(bytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }

  private String hashToken(String token) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hashed = digest.digest(token.trim().getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(hashed);
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException("SHA-256 not available", e);
    }
  }
}

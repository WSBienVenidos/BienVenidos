package com.bienvenidos.backend.dto;

import java.time.Instant;
import java.util.UUID;

public class AuthResponses {
  public record AuthTokenResponse(String token, String tokenType, long expiresInSeconds) {}

  public record UserResponse(UUID id, String email, String firstName, String lastName, Instant createdAt) {}

  public record InviteCreateResponse(String inviteLink, Instant expiresAt) {}

  public record InviteValidationResponse(boolean valid, String reason) {}
}

package com.bienvenidos.backend.dto;

import java.time.Instant;
import java.util.UUID;

public class AuthResponses {
  public record AuthTokenResponse(String token, String tokenType, long expiresInSeconds) {}

  public record UserResponse(UUID id, String email, Instant createdAt) {}
}

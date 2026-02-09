package com.bienvenidos.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AuthRequests {
  public record SignupRequest(
      @Email(message = "Email must be valid if provided") String email,
      @Pattern(regexp = "^$|^\\d{10,}$", message = "Phone must contain at least 10 digits if provided") String phone,
      @Size(min = 8, max = 72, message = "Password must be between 8 and 72 characters") String password,
      String firstName,
      String lastName
  ) {}

  public record LoginRequest(
      @Email(message = "Email must be valid if provided") String email,
      @Pattern(regexp = "^$|^\\d{10,}$", message = "Phone must contain at least 10 digits if provided") String phone,
      String password
  ) {}

  public record VerifyEmailRequest(
      String email,
      String code
  ) {}
}

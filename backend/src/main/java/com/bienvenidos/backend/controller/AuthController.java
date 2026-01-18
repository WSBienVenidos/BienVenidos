package com.bienvenidos.backend.controller;

import com.bienvenidos.backend.dto.AuthRequests;
import com.bienvenidos.backend.dto.AuthResponses;
import com.bienvenidos.backend.entity.AppUser;
import com.bienvenidos.backend.repository.AppUserRepository;
import com.bienvenidos.backend.security.AuthPrincipal;
import com.bienvenidos.backend.security.JwtService;
import com.bienvenidos.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;
  private final JwtService jwtService;
  private final AppUserRepository users;

  public AuthController(AuthService authService, JwtService jwtService, AppUserRepository users) {
    this.authService = authService;
    this.jwtService = jwtService;
    this.users = users;
  }

  @PostMapping("/signup")
  public ResponseEntity<AuthResponses.AuthTokenResponse> signup(@Valid @RequestBody AuthRequests.SignupRequest req) {
    String token = authService.signup(req);
    return ResponseEntity.ok(new AuthResponses.AuthTokenResponse(token, "Bearer", jwtService.getExpirationSeconds()));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponses.AuthTokenResponse> login(@Valid @RequestBody AuthRequests.LoginRequest req) {
    String token = authService.login(req);
    return ResponseEntity.ok(new AuthResponses.AuthTokenResponse(token, "Bearer", jwtService.getExpirationSeconds()));
  }

  @GetMapping("/me")
  public ResponseEntity<?> me(Authentication authentication) {
    if (authentication == null || !(authentication.getPrincipal() instanceof AuthPrincipal principal)) {
      return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }

    UUID id = UUID.fromString(principal.userId());
    AppUser u = users.findById(id).orElse(null);
    if (u == null) {
      return ResponseEntity.status(404).body(Map.of("error", "User not found"));
    }

    return ResponseEntity.ok(new AuthResponses.UserResponse(u.getId(), u.getEmail(), u.getCreatedAt()));
  }
}

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
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;
  private final JwtService jwtService;
  private final AppUserRepository users;
  private final boolean cookieSecure;
  private final String cookieSameSite;

  public AuthController(
      AuthService authService,
      JwtService jwtService,
      AppUserRepository users,
      @Value("${app.cookie.secure:false}") boolean cookieSecure,
      @Value("${app.cookie.sameSite:Lax}") String cookieSameSite
  ) {
    this.authService = authService;
    this.jwtService = jwtService;
    this.users = users;
    this.cookieSecure = cookieSecure;
    this.cookieSameSite = cookieSameSite;
  }

  @PostMapping("/signup")
  public ResponseEntity<AuthResponses.AuthTokenResponse> signup(@Valid @RequestBody AuthRequests.SignupRequest req) {
  String token = authService.signup(req);
  ResponseCookie cookie = ResponseCookie.from("bv_token", token)
    .httpOnly(true)
    .secure(cookieSecure)
    .path("/")
    .maxAge(jwtService.getExpirationSeconds())
    .sameSite(cookieSameSite)
    .build();

  return ResponseEntity.ok()
    .header("Set-Cookie", cookie.toString())
    .body(new AuthResponses.AuthTokenResponse(token, "Bearer", jwtService.getExpirationSeconds()));
  }

  @PostMapping("/verify-email")
  public ResponseEntity<AuthResponses.AuthTokenResponse> verifyEmail(@RequestBody AuthRequests.VerifyEmailRequest req) {
  String token = authService.verifyEmail(req);
  ResponseCookie cookie = ResponseCookie.from("bv_token", token)
    .httpOnly(true)
    .secure(cookieSecure)
    .path("/")
    .maxAge(jwtService.getExpirationSeconds())
    .sameSite(cookieSameSite)
    .build();

  return ResponseEntity.ok()
    .header("Set-Cookie", cookie.toString())
    .body(new AuthResponses.AuthTokenResponse(token, "Bearer", jwtService.getExpirationSeconds()));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponses.AuthTokenResponse> login(@Valid @RequestBody AuthRequests.LoginRequest req) {
  String token = authService.login(req);
  ResponseCookie cookie = ResponseCookie.from("bv_token", token)
    .httpOnly(true)
    .secure(cookieSecure)
    .path("/")
    .maxAge(jwtService.getExpirationSeconds())
    .sameSite(cookieSameSite)
    .build();

  return ResponseEntity.ok()
    .header("Set-Cookie", cookie.toString())
    .body(new AuthResponses.AuthTokenResponse(token, "Bearer", jwtService.getExpirationSeconds()));
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout() {
  ResponseCookie cookie = ResponseCookie.from("bv_token", "")
    .httpOnly(true)
    .secure(cookieSecure)
    .path("/")
    .maxAge(0)
    .sameSite(cookieSameSite)
    .build();
  return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).body(Map.of("ok", true));
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

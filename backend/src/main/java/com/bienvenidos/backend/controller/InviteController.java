package com.bienvenidos.backend.controller;

import com.bienvenidos.backend.dto.AuthResponses;
import com.bienvenidos.backend.security.AuthPrincipal;
import com.bienvenidos.backend.service.InviteService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/invites")
public class InviteController {
  private final InviteService inviteService;
  private final String appPublicBaseUrl;

  public InviteController(
      InviteService inviteService,
      @Value("${app.publicBaseUrl:http://localhost:3000}") String appPublicBaseUrl
  ) {
    this.inviteService = inviteService;
    this.appPublicBaseUrl = appPublicBaseUrl;
  }

  @PostMapping
  public ResponseEntity<?> createInvite(Authentication authentication) {
    if (authentication == null || !(authentication.getPrincipal() instanceof AuthPrincipal principal)) {
      return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }

    UUID inviterId = UUID.fromString(principal.userId());
    InviteService.GeneratedInvite generated = inviteService.createInvite(inviterId);
    String rawBase = appPublicBaseUrl == null ? "" : appPublicBaseUrl.trim();
    String base = rawBase;
    if (rawBase.contains(",")) {
      base = java.util.Arrays.stream(rawBase.split(","))
          .map(String::trim)
          .filter(s -> !s.isEmpty())
          .filter(s -> !s.contains("localhost:3000"))
          .findFirst()
          .orElse("");
    }
    boolean useRelative = base.isEmpty() || base.contains("localhost:3000");
    String link = (useRelative ? "" : base.replaceAll("/+$", "")) + "/sign-up?invite=" + generated.token();

    return ResponseEntity.ok(new AuthResponses.InviteCreateResponse(link, generated.expiresAt()));
  }

  @GetMapping("/validate")
  public ResponseEntity<AuthResponses.InviteValidationResponse> validate(@RequestParam("token") String token) {
    boolean valid = inviteService.isTokenValid(token);
    if (valid) {
      return ResponseEntity.ok(new AuthResponses.InviteValidationResponse(true, "ok"));
    }
    return ResponseEntity.ok(new AuthResponses.InviteValidationResponse(false, "invalid_or_expired"));
  }
}

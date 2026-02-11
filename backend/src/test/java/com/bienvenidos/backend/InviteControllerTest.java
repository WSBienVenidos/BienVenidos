package com.bienvenidos.backend;

import com.bienvenidos.backend.controller.InviteController;
import com.bienvenidos.backend.dto.AuthResponses;
import com.bienvenidos.backend.security.AuthPrincipal;
import com.bienvenidos.backend.service.InviteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InviteControllerTest {
  InviteService inviteService;
  InviteController controller;

  @BeforeEach
  void setup() {
    inviteService = mock(InviteService.class);
    controller = new InviteController(inviteService, "http://localhost:3000");
  }

  @Test
  void createInviteUnauthorizedWithoutPrincipal() {
    ResponseEntity<?> r = controller.createInvite(null);
    assertEquals(401, r.getStatusCodeValue());
    assertEquals(Map.of("error", "Unauthorized"), r.getBody());
  }

  @Test
  void createInviteReturnsSignupLink() {
    UUID inviterId = UUID.randomUUID();
    Authentication authentication = mock(Authentication.class);
    when(authentication.getPrincipal()).thenReturn(new AuthPrincipal(inviterId.toString(), "u@e.com"));
    when(inviteService.createInvite(inviterId))
        .thenReturn(new InviteService.GeneratedInvite("tok123", Instant.parse("2030-01-01T00:00:00Z")));

    ResponseEntity<?> r = controller.createInvite(authentication);
    assertEquals(200, r.getStatusCodeValue());
    assertTrue(r.getBody() instanceof AuthResponses.InviteCreateResponse);
    AuthResponses.InviteCreateResponse body = (AuthResponses.InviteCreateResponse) r.getBody();
    assertEquals("http://localhost:3000/sign-up?invite=tok123", body.inviteLink());
  }
}

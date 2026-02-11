package com.bienvenidos.backend;

import com.bienvenidos.backend.controller.AuthController;
import com.bienvenidos.backend.dto.AuthRequests;
import com.bienvenidos.backend.dto.AuthResponses;
import com.bienvenidos.backend.entity.AppUser;
import com.bienvenidos.backend.repository.AppUserRepository;
import com.bienvenidos.backend.security.AuthPrincipal;
import com.bienvenidos.backend.security.JwtService;
import com.bienvenidos.backend.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {
  AuthService authService;
  JwtService jwt;
  AppUserRepository users;
  AuthController controller;

  @BeforeEach
  void setup() {
    authService = mock(AuthService.class);
    jwt = mock(JwtService.class);
    users = mock(AppUserRepository.class);
    controller = new AuthController(authService, jwt, users);
  }

  @Test
  void signupReturnsTokenAndCookie() {
    AuthRequests.SignupRequest req = new AuthRequests.SignupRequest(
        "a@b.com",
        "8015550123",
        "password1",
        "A",
        "B",
        null
    );
    when(authService.signup(req)).thenReturn("tokval");
    when(jwt.getExpirationSeconds()).thenReturn(60L);

    ResponseEntity<AuthResponses.AuthTokenResponse> r = controller.signup(req);
    assertEquals(200, r.getStatusCodeValue());
    assertNotNull(r.getHeaders().getFirst("Set-Cookie"));
    assertEquals("tokval", r.getBody().token());
  }

  @Test
  void loginReturnsTokenAndCookie() {
    AuthRequests.LoginRequest req = new AuthRequests.LoginRequest("x@y.com", null, "pw");
    when(authService.login(req)).thenReturn("tkn");
    when(jwt.getExpirationSeconds()).thenReturn(60L);

    ResponseEntity<AuthResponses.AuthTokenResponse> r = controller.login(req);
    assertEquals(200, r.getStatusCodeValue());
    assertNotNull(r.getHeaders().getFirst("Set-Cookie"));
    assertEquals("tkn", r.getBody().token());
  }

  @Test
  void logoutClearsCookie() {
    ResponseEntity<?> r = controller.logout();
    String cookie = r.getHeaders().getFirst("Set-Cookie");
    assertTrue(cookie.contains("Max-Age=0") || cookie.contains("Max-Age=0"));
    assertEquals(Map.of("ok", true), r.getBody());
  }

  @Test
  void meUnauthorizedWhenAuthNull() {
    ResponseEntity<?> r = controller.me(null);
    assertEquals(401, r.getStatusCodeValue());
  }

  @Test
  void meReturnsNotFoundWhenUserMissing() {
    Authentication a = mock(Authentication.class);
    when(a.getPrincipal()).thenReturn(new Object());
    ResponseEntity<?> r = controller.me(a);
    assertEquals(401, r.getStatusCodeValue());

    AuthPrincipal p = new AuthPrincipal(UUID.randomUUID().toString(), "e@e.com");
    when(a.getPrincipal()).thenReturn(p);
    when(users.findById(UUID.fromString(p.userId()))).thenReturn(Optional.empty());
    ResponseEntity<?> r2 = controller.me(a);
    assertEquals(404, r2.getStatusCodeValue());
  }

  @Test
  void meReturnsUser() {
    UUID id = UUID.randomUUID();
    AuthPrincipal p = new AuthPrincipal(id.toString(), "u@e.com");
    Authentication a = mock(Authentication.class);
    when(a.getPrincipal()).thenReturn(p);

    AppUser u = new AppUser();
    u.setId(id);
    u.setEmail("u@e.com");
    u.setCreatedAt(Instant.now());
    when(users.findById(id)).thenReturn(Optional.of(u));

    ResponseEntity<?> r = controller.me(a);
    assertEquals(200, r.getStatusCodeValue());
    assertTrue(r.getBody() instanceof AuthResponses.UserResponse);
    AuthResponses.UserResponse ur = (AuthResponses.UserResponse) r.getBody();
    assertEquals(id, ur.id());
  }
}

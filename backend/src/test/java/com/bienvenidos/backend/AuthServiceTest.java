package com.bienvenidos.backend;

import com.bienvenidos.backend.dto.AuthRequests;
import com.bienvenidos.backend.entity.AppUser;
import com.bienvenidos.backend.repository.AppUserRepository;
import com.bienvenidos.backend.security.JwtService;
import com.bienvenidos.backend.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {
  AppUserRepository users;
  PasswordEncoder encoder;
  JwtService jwt;
  AuthService auth;

  @BeforeEach
  void setup() {
    users = mock(AppUserRepository.class);
    encoder = mock(PasswordEncoder.class);
    jwt = mock(JwtService.class);
    auth = new AuthService(users, encoder, jwt);
  }

  @Test
  void signupCreatesUserAndReturnsToken() {
    AuthRequests.SignupRequest req = new AuthRequests.SignupRequest("New@Email.com", "pass123");
    when(users.existsByEmailIgnoreCase("New@Email.com")).thenReturn(false);

    UUID fakeId = UUID.randomUUID();
    when(jwt.issueToken(any(), any())).thenReturn("tok");

    // capture saved user
    ArgumentCaptor<AppUser> cap = ArgumentCaptor.forClass(AppUser.class);
    when(users.save(cap.capture())).thenAnswer(i -> {
      AppUser u = i.getArgument(0);
      u.setId(fakeId);
      return u;
    });

    when(encoder.encode("pass123")).thenReturn("hashed");

    String token = auth.signup(req);
    assertEquals("tok", token);

    AppUser saved = cap.getValue();
    assertEquals("new@email.com", saved.getEmail());
    assertEquals("hashed", saved.getPasswordHash());
  }

  @Test
  void signupDuplicateEmailThrows() {
    AuthRequests.SignupRequest req = new AuthRequests.SignupRequest("a@b.com", "x");
    when(users.existsByEmailIgnoreCase("a@b.com")).thenReturn(true);
    assertThrows(IllegalArgumentException.class, () -> auth.signup(req));
  }

  @Test
  void loginSuccessReturnsToken() {
    AuthRequests.LoginRequest req = new AuthRequests.LoginRequest("u@e.com", "pw");
    AppUser u = new AppUser();
    u.setEmail("u@e.com");
    u.setPasswordHash("hash");
    when(users.findByEmailIgnoreCase("u@e.com")).thenReturn(Optional.of(u));
    when(encoder.matches("pw", "hash")).thenReturn(true);
    when(jwt.issueToken(any(), any())).thenReturn("tkn");

    String token = auth.login(req);
    assertEquals("tkn", token);
  }

  @Test
  void loginBadPasswordThrows() {
    AuthRequests.LoginRequest req = new AuthRequests.LoginRequest("u@e.com", "pw");
    AppUser u = new AppUser();
    u.setEmail("u@e.com");
    u.setPasswordHash("hash");
    when(users.findByEmailIgnoreCase("u@e.com")).thenReturn(Optional.of(u));
    when(encoder.matches("pw", "hash")).thenReturn(false);

    assertThrows(IllegalArgumentException.class, () -> auth.login(req));
  }

  @Test
  void loginUnknownUserThrows() {
    AuthRequests.LoginRequest req = new AuthRequests.LoginRequest("no@u.com", "pw");
    when(users.findByEmailIgnoreCase("no@u.com")).thenReturn(Optional.empty());
    assertThrows(IllegalArgumentException.class, () -> auth.login(req));
  }
}

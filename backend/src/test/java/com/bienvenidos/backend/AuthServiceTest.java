package com.bienvenidos.backend;

import com.bienvenidos.backend.dto.AuthRequests;
import com.bienvenidos.backend.entity.AppUser;
import com.bienvenidos.backend.repository.AppUserRepository;
import com.bienvenidos.backend.security.JwtService;
import com.bienvenidos.backend.service.AuthService;
import com.bienvenidos.backend.service.EmailService;
import com.bienvenidos.backend.service.InviteService;
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
  EmailService emailService;
  InviteService inviteService;
  AuthService auth;

  @BeforeEach
  void setup() {
    users = mock(AppUserRepository.class);
    encoder = mock(PasswordEncoder.class);
    jwt = mock(JwtService.class);
    emailService = mock(EmailService.class);
    inviteService = mock(InviteService.class);
    auth = new AuthService(users, encoder, jwt, emailService, inviteService, false);
  }

  @Test
  void signupCreatesUserAndReturnsToken() {
    AuthRequests.SignupRequest req = new AuthRequests.SignupRequest(
        "New@Email.com",
        "801-555-0123",
        "pass12345",
        "New",
        "User",
        null
    );
    when(users.existsByEmailIgnoreCase("New@Email.com")).thenReturn(false);
    when(users.existsByPhone("8015550123")).thenReturn(false);

    UUID fakeId = UUID.randomUUID();

    // capture saved user
    ArgumentCaptor<AppUser> cap = ArgumentCaptor.forClass(AppUser.class);
    when(users.save(cap.capture())).thenAnswer(i -> {
      AppUser u = i.getArgument(0);
      u.setId(fakeId);
      return u;
    });

    when(encoder.encode("pass12345")).thenReturn("hashed");

    String token = auth.signup(req);
    assertEquals("UNVERIFIED:" + fakeId, token);

    AppUser saved = cap.getValue();
    assertEquals("new@email.com", saved.getEmail());
    assertEquals("8015550123", saved.getPhone());
    assertEquals("hashed", saved.getPasswordHash());
    assertFalse(saved.getEmailVerified());
    assertNotNull(saved.getVerificationCode());
    assertNotNull(saved.getVerificationCodeExpiry());
    verify(emailService).sendVerificationEmail(eq("new@email.com"), anyString());
    verify(jwt, never()).issueToken(any(), any());
  }

  @Test
  void signupDuplicateEmailThrows() {
    AuthRequests.SignupRequest req = new AuthRequests.SignupRequest(
        "a@b.com",
        "8015550199",
        "password123",
        "A",
        "B",
        null
    );
    when(users.existsByEmailIgnoreCase("a@b.com")).thenReturn(true);
    assertThrows(IllegalArgumentException.class, () -> auth.signup(req));
  }

  @Test
  void loginSuccessReturnsToken() {
    AuthRequests.LoginRequest req = new AuthRequests.LoginRequest("u@e.com", null, "pw");
    AppUser u = new AppUser();
    u.setId(UUID.randomUUID());
    u.setEmail("u@e.com");
    u.setPasswordHash("hash");
    u.setEmailVerified(true);
    when(users.findByEmailIgnoreCase("u@e.com")).thenReturn(Optional.of(u));
    when(encoder.matches("pw", "hash")).thenReturn(true);
    when(jwt.issueToken(any(), any())).thenReturn("tkn");

    String token = auth.login(req);
    assertEquals("tkn", token);
  }

  @Test
  void loginBadPasswordThrows() {
    AuthRequests.LoginRequest req = new AuthRequests.LoginRequest("u@e.com", null, "pw");
    AppUser u = new AppUser();
    u.setEmail("u@e.com");
    u.setPasswordHash("hash");
    u.setEmailVerified(true);
    when(users.findByEmailIgnoreCase("u@e.com")).thenReturn(Optional.of(u));
    when(encoder.matches("pw", "hash")).thenReturn(false);

    assertThrows(IllegalArgumentException.class, () -> auth.login(req));
  }

  @Test
  void loginUnknownUserThrows() {
    AuthRequests.LoginRequest req = new AuthRequests.LoginRequest("no@u.com", null, "pw");
    when(users.findByEmailIgnoreCase("no@u.com")).thenReturn(Optional.empty());
    assertThrows(IllegalArgumentException.class, () -> auth.login(req));
  }

  @Test
  void signupConsumesInviteWhenRequired() {
    AuthService inviteProtected = new AuthService(users, encoder, jwt, emailService, inviteService, true);
    AuthRequests.SignupRequest req = new AuthRequests.SignupRequest(
        "invite@ok.com",
        "8015550999",
        "password123",
        "I",
        "User",
        "invite-token-1"
    );
    when(users.existsByEmailIgnoreCase("invite@ok.com")).thenReturn(false);
    when(users.existsByPhone("8015550999")).thenReturn(false);
    when(encoder.encode("password123")).thenReturn("hashed");
    when(users.save(any(AppUser.class))).thenAnswer(i -> {
      AppUser u = i.getArgument(0);
      u.setId(UUID.randomUUID());
      return u;
    });

    inviteProtected.signup(req);

    verify(inviteService).consumeInvite(eq("invite-token-1"), any(UUID.class));
  }
}

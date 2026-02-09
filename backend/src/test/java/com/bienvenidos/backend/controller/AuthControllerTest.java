package com.bienvenidos.backend.controller;

import com.bienvenidos.backend.dto.AuthRequests;
import com.bienvenidos.backend.dto.AuthResponses;
import com.bienvenidos.backend.entity.AppUser;
import com.bienvenidos.backend.repository.AppUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for AuthController endpoints.
 * Tests signup, login, and authenticated user endpoints.
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "app.jwt.secret=test-secret-at-least-32-characters-long-1234567890",
    "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password="
})
public class AuthControllerTest {

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;
  @Autowired private AppUserRepository appUserRepository;
  @Autowired private PasswordEncoder passwordEncoder;

  @BeforeEach
  void setUp() {
    // Clear database before each test
    appUserRepository.deleteAll();
  }

  // ==================== SIGNUP TESTS ====================

  @Test
  void testSignupSuccessfullyWithEmail() throws Exception {
    // Arrange
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        "newuser@example.com",
        "18015551234",
        "Password123!"
    );

    // Act & Assert
    MvcResult result = mockMvc.perform(post("/api/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isNotEmpty())
        .andExpect(jsonPath("$.tokenType").value("Bearer"))
        .andExpect(jsonPath("$.expiresInSeconds").isNumber())
        .andReturn();

    // Verify user was created in database but not verified
    assertThat(appUserRepository.findByEmailIgnoreCase("newuser@example.com"))
        .isPresent()
        .get()
        .extracting("email")
        .isEqualTo("newuser@example.com");
  }

  @Test
  void testSignupWithDuplicateEmailFails() throws Exception {
    // Arrange: Create a user first
    AppUser existingUser = new AppUser();
    existingUser.setEmail("duplicate@example.com");
    existingUser.setPhone("18015559999");
    existingUser.setPasswordHash(passwordEncoder.encode("Password123!"));
    existingUser.setEmailVerified(true);
    appUserRepository.save(existingUser);

    // Act & Assert: Try to signup with same email
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        "duplicate@example.com",
        "18015551111",
        "AnotherPassword123!"
    );

    mockMvc.perform(post("/api/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Email already registered"));
  }

  @Test
  void testSignupWithInvalidEmailFails() throws Exception {
    // Arrange
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        "not-an-email",
        "18015551234",
        "Password123!"
    );

    // Act & Assert
    mockMvc.perform(post("/api/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").exists());
  }

  @Test
  void testSignupWithShortPasswordFails() throws Exception {
    // Arrange: Password must be at least 8 chars
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        "user@example.com",
        "18015551234",
        "Short1!"  // Only 7 chars
    );

    // Act & Assert
    mockMvc.perform(post("/api/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").exists());
  }

  @Test
  void testSignupSuccessfullyWithPhone() throws Exception {
    // Arrange
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        "phoneuser@example.com",
        "18015551234",
        "Password123!"
    );

    // Act & Assert
    MvcResult result = mockMvc.perform(post("/api/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isNotEmpty())
        .andExpect(jsonPath("$.tokenType").value("Bearer"))
        .andExpect(jsonPath("$.expiresInSeconds").isNumber())
        .andReturn();

    // Verify user was created with phone in database
    assertThat(appUserRepository.findByPhone("18015551234"))
        .isPresent()
        .get()
        .extracting("phone")
        .isEqualTo("18015551234");
  }

  @Test
  void testSignupWithInvalidPhoneFails() throws Exception {
    // Arrange: Phone must have at least 10 digits
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        "user@example.com",
        "123",
        "Password123!"
    );

    // Act & Assert
    mockMvc.perform(post("/api/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").exists());
  }

  @Test
  void testSignupWithNeitherEmailNorPhoneFails() throws Exception {
    // Arrange: Neither email nor phone provided
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        null,
        null,
        "Password123!"
    );

    // Act & Assert
    mockMvc.perform(post("/api/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Email is required"));
  }

  // ==================== LOGIN TESTS ====================

  @Test
  void testLoginSuccessfully() throws Exception {
    // Arrange: Create and verify a user first
    String password = "Password123!";
    AppUser user = new AppUser();
    user.setEmail("testuser@example.com");
    user.setPhone("18015551234");
    user.setPasswordHash(passwordEncoder.encode(password));
    user.setEmailVerified(true);
    appUserRepository.save(user);

    // Act & Assert
    AuthRequests.LoginRequest request = new AuthRequests.LoginRequest(
        "testuser@example.com",
        null,
        password
    );

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isNotEmpty())
        .andExpect(jsonPath("$.tokenType").value("Bearer"))
        .andExpect(jsonPath("$.expiresInSeconds").isNumber());
  }

  @Test
  void testLoginWithWrongPasswordFails() throws Exception {
    // Arrange: Create and verify a user
    String correctPassword = "CorrectPassword123!";
    AppUser user = new AppUser();
    user.setEmail("testuser@example.com");
    user.setPhone("18015551234");
    user.setPasswordHash(passwordEncoder.encode(correctPassword));
    user.setEmailVerified(true);
    appUserRepository.save(user);

    // Act & Assert: Try to login with wrong password
    AuthRequests.LoginRequest request = new AuthRequests.LoginRequest(
        "testuser@example.com",
        null,
        "WrongPassword123!"
    );

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Invalid credentials"));
  }

  @Test
  void testLoginWithNonVerifiedEmailFails() throws Exception {
    // Arrange: Create user but don't verify email
    String password = "Password123!";
    AppUser user = new AppUser();
    user.setEmail("unverified@example.com");
    user.setPhone("18015551234");
    user.setPasswordHash(passwordEncoder.encode(password));
    user.setEmailVerified(false);
    user.setVerificationCode("123456");
    appUserRepository.save(user);

    // Act & Assert
    AuthRequests.LoginRequest request = new AuthRequests.LoginRequest(
        "unverified@example.com",
        null,
        password
    );

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Email not verified. Please verify your email first."));
  }

  @Test
  void testLoginSuccessfullyWithPhone() throws Exception {
    // Arrange: Create a user with phone first
    String password = "Password123!";
    AppUser user = new AppUser();
    user.setEmail("phonelogintest@example.com");
    user.setPhone("18015551234");
    user.setPasswordHash(passwordEncoder.encode(password));
    user.setEmailVerified(true);
    appUserRepository.save(user);

    // Act & Assert
    AuthRequests.LoginRequest request = new AuthRequests.LoginRequest(
        null,
        "18015551234",
        password
    );

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isNotEmpty())
        .andExpect(jsonPath("$.tokenType").value("Bearer"))
        .andExpect(jsonPath("$.expiresInSeconds").isNumber());
  }

  // ==================== EMAIL VERIFICATION TESTS ====================

  @Test
  void testVerifyEmailSuccessfully() throws Exception {
    // Arrange: Create a user with verification code
    String email = "verify@example.com";
    AppUser user = new AppUser();
    user.setEmail(email);
    user.setPhone("18015551234");
    user.setPasswordHash(passwordEncoder.encode("Password123!"));
    user.setEmailVerified(false);
    user.setVerificationCode("123456");
    user.setVerificationCodeExpiry(java.time.Instant.now().plusSeconds(15 * 60));
    appUserRepository.save(user);

    // Act & Assert
    AuthRequests.VerifyEmailRequest request = new AuthRequests.VerifyEmailRequest(email, "123456");
    mockMvc.perform(post("/api/auth/verify-email")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isNotEmpty())
        .andExpect(jsonPath("$.tokenType").value("Bearer"));

    // Verify user is now verified in database
    assertThat(appUserRepository.findByEmailIgnoreCase(email))
        .isPresent()
        .get()
        .extracting("emailVerified")
        .isEqualTo(true);
  }

  @Test
  void testVerifyEmailWithInvalidCodeFails() throws Exception {
    // Arrange: Create a user with verification code
    String email = "verify2@example.com";
    AppUser user = new AppUser();
    user.setEmail(email);
    user.setPhone("18015551234");
    user.setPasswordHash(passwordEncoder.encode("Password123!"));
    user.setEmailVerified(false);
    user.setVerificationCode("123456");
    user.setVerificationCodeExpiry(java.time.Instant.now().plusSeconds(15 * 60));
    appUserRepository.save(user);

    // Act & Assert
    AuthRequests.VerifyEmailRequest request = new AuthRequests.VerifyEmailRequest(email, "999999");
    mockMvc.perform(post("/api/auth/verify-email")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Invalid verification code"));
  }

  // TODO: Add test for expired codes - timing issues in test environment  

  // ==================== AUTHENTICATED USER TESTS ====================

  @Test
  void testGetAuthenticatedUserInfoSuccessfully() throws Exception {
    // Arrange: Create a verified user and get a token
    String password = "Password123!";
    AppUser user = new AppUser();
    user.setEmail("authuser@example.com");
    user.setPhone("18015551234");
    user.setPasswordHash(passwordEncoder.encode(password));
    user.setEmailVerified(true);
    appUserRepository.save(user);

    // Login to get token
    AuthRequests.LoginRequest loginRequest = new AuthRequests.LoginRequest(
        "authuser@example.com",
        null,
        password
    );

    MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(loginRequest)))
        .andExpect(status().isOk())
        .andReturn();

    String responseBody = loginResult.getResponse().getContentAsString();
    AuthResponses.AuthTokenResponse tokenResponse = objectMapper.readValue(
        responseBody,
        AuthResponses.AuthTokenResponse.class
    );
    String token = tokenResponse.token();

    // Act & Assert: Use token to fetch user info
    mockMvc.perform(get("/api/auth/me")
        .header("Authorization", "Bearer " + token))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.email").value("authuser@example.com"))
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty());
  }

  @Test
  void testGetUserInfoWithoutAuthenticationFails() throws Exception {
    // Act & Assert: Try to access /me without token
    mockMvc.perform(get("/api/auth/me"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.error").value("Unauthorized"));
  }

  @Test
  void testGetUserInfoWithInvalidTokenFails() throws Exception {
    // Act & Assert
    mockMvc.perform(get("/api/auth/me")
        .header("Authorization", "Bearer invalid-token-xyz"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.error").value("Unauthorized"));
  }

  // ==================== HEALTH CHECK ====================

  @Test
  void testHealthEndpointIsAccessibleWithoutAuth() throws Exception {
    // Act & Assert
    mockMvc.perform(get("/api/health"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.ok").value(true));
  }
}

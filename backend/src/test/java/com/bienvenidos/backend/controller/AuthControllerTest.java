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
  void testSignupSuccessfully() throws Exception {
    // Arrange
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        "newuser@example.com",
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

    // Verify user was created in database
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
    existingUser.setPasswordHash(passwordEncoder.encode("Password123!"));
    appUserRepository.save(existingUser);

    // Act & Assert: Try to signup with same email
    AuthRequests.SignupRequest request = new AuthRequests.SignupRequest(
        "duplicate@example.com",
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
        "Short1!"  // Only 7 chars
    );

    // Act & Assert
    mockMvc.perform(post("/api/auth/signup")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").exists());
  }

  // ==================== LOGIN TESTS ====================

  @Test
  void testLoginSuccessfully() throws Exception {
    // Arrange: Create a user first
    String password = "Password123!";
    AppUser user = new AppUser();
    user.setEmail("testuser@example.com");
    user.setPasswordHash(passwordEncoder.encode(password));
    appUserRepository.save(user);

    // Act & Assert
    AuthRequests.LoginRequest request = new AuthRequests.LoginRequest(
        "testuser@example.com",
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
    // Arrange: Create a user
    String correctPassword = "CorrectPassword123!";
    AppUser user = new AppUser();
    user.setEmail("testuser@example.com");
    user.setPasswordHash(passwordEncoder.encode(correctPassword));
    appUserRepository.save(user);

    // Act & Assert: Try to login with wrong password
    AuthRequests.LoginRequest request = new AuthRequests.LoginRequest(
        "testuser@example.com",
        "WrongPassword123!"
    );

    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Invalid email or password"));
  }

  @Test
  void testLoginWithNonExistentUserFails() throws Exception {
    // Arrange
    AuthRequests.LoginRequest request = new AuthRequests.LoginRequest(
        "nonexistent@example.com",
        "Password123!"
    );

    // Act & Assert
    mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.error").value("Invalid email or password"));
  }

  // ==================== AUTHENTICATED USER TESTS ====================

  @Test
  void testGetAuthenticatedUserInfoSuccessfully() throws Exception {
    // Arrange: Create a user and get a token
    String password = "Password123!";
    AppUser user = new AppUser();
    user.setEmail("authuser@example.com");
    user.setPasswordHash(passwordEncoder.encode(password));
    appUserRepository.save(user);

    // Login to get token
    AuthRequests.LoginRequest loginRequest = new AuthRequests.LoginRequest(
        "authuser@example.com",
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

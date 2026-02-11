package com.bienvenidos.backend;

import com.bienvenidos.backend.security.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {
  @Test
  void issueAndParseToken() {
    String secret = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; //32 chars
    JwtService s = new JwtService(secret, 60);

    UUID id = UUID.randomUUID();
    String token = s.issueToken(id, "test@example.com");
    assertNotNull(token);

    Jws<Claims> parsed = s.parse(token);
    assertEquals(id.toString(), parsed.getBody().getSubject());
    assertEquals("test@example.com", parsed.getBody().get("email"));
  }

  @Test
  void invalidSecretThrows() {
    assertThrows(IllegalArgumentException.class, () -> new JwtService("short", 60));
  }
}

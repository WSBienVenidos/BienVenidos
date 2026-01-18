package com.bienvenidos.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {

  private final Key key;
  private final long expirationSeconds;

  public JwtService(@Value("${app.jwt.secret}") String secret,
                    @Value("${app.jwt.expirationMinutes}") long expirationMinutes) {
    if (secret == null || secret.length() < 32) {
      throw new IllegalArgumentException("JWT_SECRET must be at least 32 characters");
    }
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expirationSeconds = expirationMinutes * 60L;
  }

  public String issueToken(UUID userId, String email) {
    Instant now = Instant.now();
    Instant exp = now.plusSeconds(expirationSeconds);

    return Jwts.builder()
        .setSubject(userId.toString())
        .claim("email", email)
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(exp))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public Jws<Claims> parse(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token);
  }

  public long getExpirationSeconds() {
    return expirationSeconds;
  }
}

package com.bienvenidos.backend.config;

import org.junit.jupiter.api.Test;
import org.springframework.web.cors.CorsConfiguration;

import static org.junit.jupiter.api.Assertions.*;

class SecurityConfigTest {

  @Test
  void corsConfigurationParsesAllowedOrigins() {
    SecurityConfig cfg = new SecurityConfig();
    // set private field allowedOrigin via reflection
    try {
      var f = SecurityConfig.class.getDeclaredField("allowedOrigin");
      f.setAccessible(true);
      f.set(cfg, "https://a.com, https://b.com,  ");
    } catch (Exception e) {
      throw new RuntimeException(e);
    }

    var src = cfg.corsConfigurationSource();
    org.springframework.web.cors.UrlBasedCorsConfigurationSource urlSrc =
        (org.springframework.web.cors.UrlBasedCorsConfigurationSource) src;
    CorsConfiguration c = urlSrc.getCorsConfigurations().get("/**");
    assertNotNull(c);
    assertTrue(c.getAllowedOrigins().contains("https://a.com"));
    assertTrue(c.getAllowedOrigins().contains("https://b.com"));
    assertTrue(c.getAllowCredentials());
    assertTrue(c.getAllowedHeaders().contains("Authorization"));
    assertTrue(c.getAllowedMethods().contains("POST"));
  }

  @Test
  void passwordEncoderIsBCrypt() {
    SecurityConfig cfg = new SecurityConfig();
    var enc = cfg.passwordEncoder();
    assertNotNull(enc);
    assertEquals("org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder", enc.getClass().getName());
  }
}

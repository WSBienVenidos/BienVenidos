package com.bienvenidos.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtAuthFilterTest {

  @AfterEach
  void tearDown() {
    SecurityContextHolder.clearContext();
  }

  @Test
  void noTokenCallsChainAndLeavesContextEmpty() throws ServletException, IOException {
    JwtService jwt = new JwtService("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 60);
    JwtAuthFilter filter = new JwtAuthFilter(jwt);

    HttpServletRequest req = mock(HttpServletRequest.class);
    HttpServletResponse resp = mock(HttpServletResponse.class);
    FilterChain chain = mock(FilterChain.class);

    when(req.getHeader("Authorization")).thenReturn(null);
    when(req.getCookies()).thenReturn(null);

    filter.doFilterInternal(req, resp, chain);

    verify(chain).doFilter(req, resp);
    Authentication a = SecurityContextHolder.getContext().getAuthentication();
    assertNull(a);
  }

  @Test
  void validTokenInHeaderSetsAuthentication() throws ServletException, IOException {
    JwtService jwt = new JwtService("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 60);
    JwtAuthFilter filter = new JwtAuthFilter(jwt);

    UUID id = UUID.randomUUID();
    String token = jwt.issueToken(id, "u@example.com");

    HttpServletRequest req = mock(HttpServletRequest.class);
    HttpServletResponse resp = mock(HttpServletResponse.class);
    FilterChain chain = mock(FilterChain.class);

    when(req.getHeader("Authorization")).thenReturn("Bearer " + token);

    filter.doFilterInternal(req, resp, chain);

    verify(chain).doFilter(req, resp);
    Authentication a = SecurityContextHolder.getContext().getAuthentication();
    assertNotNull(a);
    assertTrue(a.getPrincipal() instanceof AuthPrincipal);
    AuthPrincipal p = (AuthPrincipal) a.getPrincipal();
    assertEquals(id.toString(), p.userId());
    assertEquals("u@example.com", p.email());
  }

  @Test
  void validTokenInCookieSetsAuthentication() throws ServletException, IOException {
    JwtService jwt = new JwtService("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 60);
    JwtAuthFilter filter = new JwtAuthFilter(jwt);

    UUID id = UUID.randomUUID();
    String token = jwt.issueToken(id, "cookie@example.com");

    HttpServletRequest req = mock(HttpServletRequest.class);
    HttpServletResponse resp = mock(HttpServletResponse.class);
    FilterChain chain = mock(FilterChain.class);

    when(req.getHeader("Authorization")).thenReturn(null);
    when(req.getCookies()).thenReturn(new Cookie[]{ new Cookie("bv_token", token) });

    filter.doFilterInternal(req, resp, chain);

    verify(chain).doFilter(req, resp);
    Authentication a = SecurityContextHolder.getContext().getAuthentication();
    assertNotNull(a);
    assertTrue(a.getPrincipal() instanceof AuthPrincipal);
    AuthPrincipal p = (AuthPrincipal) a.getPrincipal();
    assertEquals(id.toString(), p.userId());
    assertEquals("cookie@example.com", p.email());
  }

  @Test
  void invalidTokenClearsContextAndProceeds() throws ServletException, IOException {
    JwtService jwt = new JwtService("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 60);
    JwtAuthFilter filter = new JwtAuthFilter(jwt);

    HttpServletRequest req = mock(HttpServletRequest.class);
    HttpServletResponse resp = mock(HttpServletResponse.class);
    FilterChain chain = mock(FilterChain.class);

    when(req.getHeader("Authorization")).thenReturn("Bearer badtoken");

    filter.doFilterInternal(req, resp, chain);

    verify(chain).doFilter(req, resp);
    Authentication a = SecurityContextHolder.getContext().getAuthentication();
    assertNull(a);
  }
}

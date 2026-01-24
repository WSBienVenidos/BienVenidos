package com.bienvenidos.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtService jwtService;

  public JwtAuthFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    // Try Authorization header first, then fall back to the HttpOnly cookie named "bv_token".
    String token = null;
    String header = request.getHeader("Authorization");
    if (header != null && header.startsWith("Bearer ")) {
      token = header.substring(7);
    } else {
      if (request.getCookies() != null) {
        for (Cookie c : request.getCookies()) {
          if ("bv_token".equals(c.getName())) {
            token = c.getValue();
            break;
          }
        }
      }
    }

    if (token == null) {
      filterChain.doFilter(request, response);
      return;
    }
    try {
      Jws<Claims> parsed = jwtService.parse(token);
      String userId = parsed.getBody().getSubject();
      String email = parsed.getBody().get("email", String.class);

      var auth = new UsernamePasswordAuthenticationToken(
          new AuthPrincipal(userId, email),
          null,
          List.of(new SimpleGrantedAuthority("ROLE_USER"))
      );
      SecurityContextHolder.getContext().setAuthentication(auth);
    } catch (Exception ex) {
      // Invalid token => ignore and continue; protected endpoints will fail as unauthenticated
      SecurityContextHolder.clearContext();
    }

    filterChain.doFilter(request, response);
  }
}

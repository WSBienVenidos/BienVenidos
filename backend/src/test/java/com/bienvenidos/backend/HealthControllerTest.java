package com.bienvenidos.backend;

import com.bienvenidos.backend.controller.HealthController;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class HealthControllerTest {
  @Test
  void healthReturnsOk() {
    HealthController c = new HealthController();
    Map<String, Object> m = c.health();
    assertNotNull(m);
    assertTrue(m.containsKey("ok"));
    assertEquals(Boolean.TRUE, m.get("ok"));
  }
}

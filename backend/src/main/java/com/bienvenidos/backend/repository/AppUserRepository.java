package com.bienvenidos.backend.repository;

import com.bienvenidos.backend.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AppUserRepository extends JpaRepository<AppUser, UUID> {
  Optional<AppUser> findByEmailIgnoreCase(String email);
  boolean existsByEmailIgnoreCase(String email);
}

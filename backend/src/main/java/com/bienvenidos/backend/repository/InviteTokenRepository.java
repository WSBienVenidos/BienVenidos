package com.bienvenidos.backend.repository;

import com.bienvenidos.backend.entity.InviteToken;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.util.Optional;
import java.util.UUID;

public interface InviteTokenRepository extends JpaRepository<InviteToken, UUID> {
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  Optional<InviteToken> findByTokenHash(String tokenHash);
}

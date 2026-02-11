package com.bienvenidos.backend.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "invite_tokens", schema = "public")
public class InviteToken {

  @Id
  @GeneratedValue
  @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(name = "token_hash", nullable = false, unique = true)
  private String tokenHash;

  @Column(name = "created_by_user_id", nullable = false, columnDefinition = "uuid")
  private UUID createdByUserId;

  @Column(name = "expires_at", nullable = false)
  private Instant expiresAt;

  @Column(name = "used_at")
  private Instant usedAt;

  @Column(name = "used_by_user_id", columnDefinition = "uuid")
  private UUID usedByUserId;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @PrePersist
  public void onCreate() {
    if (createdAt == null) createdAt = Instant.now();
  }

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }

  public String getTokenHash() { return tokenHash; }
  public void setTokenHash(String tokenHash) { this.tokenHash = tokenHash; }

  public UUID getCreatedByUserId() { return createdByUserId; }
  public void setCreatedByUserId(UUID createdByUserId) { this.createdByUserId = createdByUserId; }

  public Instant getExpiresAt() { return expiresAt; }
  public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }

  public Instant getUsedAt() { return usedAt; }
  public void setUsedAt(Instant usedAt) { this.usedAt = usedAt; }

  public UUID getUsedByUserId() { return usedByUserId; }
  public void setUsedByUserId(UUID usedByUserId) { this.usedByUserId = usedByUserId; }

  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}

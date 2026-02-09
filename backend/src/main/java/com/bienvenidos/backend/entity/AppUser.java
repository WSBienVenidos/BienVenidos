package com.bienvenidos.backend.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "app_users", schema = "public")
public class AppUser {

  @Id
  @GeneratedValue
  @Column(columnDefinition = "uuid")
  private UUID id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false, unique = true)
  private String phone;

  @Column(name = "first_name", nullable = true)
  private String firstName;

  @Column(name = "last_name", nullable = true)
  private String lastName;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @Column(name = "email_verified", nullable = false)
  private Boolean emailVerified = false;

  @Column(name = "verification_code", nullable = true)
  private String verificationCode;

  @Column(name = "verification_code_expiry", nullable = true)
  private Instant verificationCodeExpiry;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @PrePersist
  public void onCreate() {
    if (createdAt == null) createdAt = Instant.now();
    if (emailVerified == null) emailVerified = false;
  }

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }

  public String getFirstName() { return firstName; }
  public void setFirstName(String firstName) { this.firstName = firstName; }

  public String getLastName() { return lastName; }
  public void setLastName(String lastName) { this.lastName = lastName; }

  public String getPasswordHash() { return passwordHash; }
  public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

  public Boolean getEmailVerified() { return emailVerified; }
  public void setEmailVerified(Boolean emailVerified) { this.emailVerified = emailVerified; }

  public String getVerificationCode() { return verificationCode; }
  public void setVerificationCode(String verificationCode) { this.verificationCode = verificationCode; }

  public Instant getVerificationCodeExpiry() { return verificationCodeExpiry; }
  public void setVerificationCodeExpiry(Instant verificationCodeExpiry) { this.verificationCodeExpiry = verificationCodeExpiry; }

  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}

package com.bienvenidos.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  private final JavaMailSender mailSender;

  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  public void sendVerificationEmail(String toEmail, String verificationCode) {
    try {
      SimpleMailMessage message = new SimpleMailMessage();
      message.setFrom("noreply@bienvenidos.com");
      message.setTo(toEmail);
      message.setSubject("Verifica tu correo electrónico - BienVenidos");
      message.setText(
          "Hola,\n\n" +
          "Gracias por crear tu cuenta en BienVenidos.\n\n" +
          "Tu código de verificación es: " + verificationCode + "\n\n" +
          "Este código expirará en 15 minutos.\n\n" +
          "Si no creaste esta cuenta, ignora este correo.\n\n" +
          "Saludos,\n" +
          "El equipo de BienVenidos"
      );
      mailSender.send(message);
    } catch (Exception e) {
      // Log error but don't throw - signup should still succeed
      System.err.println("Failed to send verification email to " + toEmail + ": " + e.getMessage());
    }
  }
}

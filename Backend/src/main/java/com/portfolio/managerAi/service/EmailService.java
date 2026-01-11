package com.portfolio.managerAi.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class EmailService {

    @Value("${brevo.api.key}")
    private String apiKey;

    @Value("${brevo.sender.email}")
    private String senderEmail;

    private static final String BREVO_URL =
            "https://api.brevo.com/v3/smtp/email";

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendEmail(String to, String subject, String body) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", apiKey);

            String safeBody = (body == null || body.isBlank())
                    ? " "
                    : body;

            Map<String, Object> payload = Map.of(
                    "sender", Map.of(
                            "email", senderEmail,
                            "name", "Manager AI"
                    ),
                    "to", List.of(Map.of("email", to)),
                    "subject", subject,
                    "htmlContent", "<p>" + safeBody + "</p>"
            );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(payload, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(BREVO_URL, request, String.class);

            log.info("Brevo email sent to {} | status={}",
                    to, response.getStatusCode());

        } catch (Exception e) {
            log.error("Failed to send email via Brevo to {}", to, e);
        }
    }

    public void sendEmailWithAttachment(
            String to,
            String subject,
            String body,
            byte[] fileBytes,
            String fileName) {

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", apiKey);

            // Brevo requires Base64 encoded attachment
            String encodedFile = Base64.getEncoder()
                    .encodeToString(fileBytes);

            String safeBody = (body == null || body.isBlank())
                    ? " "
                    : body;

            Map<String, Object> payload = Map.of(
                    "sender", Map.of(
                            "email", senderEmail,
                            "name", "Manager AI"
                    ),
                    "to", List.of(Map.of("email", to)),
                    "subject", subject,
                    "htmlContent", "<p>" + safeBody + "</p>",
                    "attachment", List.of(
                            Map.of(
                                    "content", encodedFile,
                                    "name", fileName
                            )
                    )
            );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(payload, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(
                            BREVO_URL, request, String.class);

            log.info("Brevo email with attachment sent to {} | status={}",
                    to, response.getStatusCode());

        } catch (Exception e) {
            log.error("Failed to send email with attachment via Brevo to {}",
                    to, e);
        }
    }

}


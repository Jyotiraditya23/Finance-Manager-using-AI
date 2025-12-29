package com.portfolio.managerAi.Suggestion;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiService {

//    private final RestTemplate restTemplate;
//    private final GeminiConfig geminiConfig;
//
//    public String generateContent(String prompt) {
//        try {
//            String url = geminiConfig.getApiUrl() + "?key=" + geminiConfig.getApiKey();
//
//            // Build request
//            GeminiRequestDTO.Part part = GeminiRequestDTO.Part.builder()
//                    .text(prompt)
//                    .build();
//
//            GeminiRequestDTO.Content content = GeminiRequestDTO.Content.builder()
//                    .parts(Collections.singletonList(part))
//                    .build();
//
//            GeminiRequestDTO request = GeminiRequestDTO.builder()
//                    .contents(Collections.singletonList(content))
//                    .build();
//
//            // Set headers
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            HttpEntity<GeminiRequestDTO> entity = new HttpEntity<>(request, headers);
//
//            // Make API call
//            ResponseEntity<GeminiResponseDTO> response = restTemplate.exchange(
//                    url,
//                    HttpMethod.POST,
//                    entity,
//                    GeminiResponseDTO.class
//            );
//
//            // Extract text from response
//            if (response.getBody() != null
//                    && response.getBody().getCandidates() != null
//                    && !response.getBody().getCandidates().isEmpty()) {
//                return response.getBody()
//                        .getCandidates()
//                        .get(0)
//                        .getContent()
//                        .getParts()
//                        .get(0)
//                        .getText();
//            }
//
//            return "Unable to generate insights at this time.";
//
//        } catch (Exception e) {
//            log.error("Error calling Gemini API: {}", e.getMessage(), e);
//            return "Error generating insights: " + e.getMessage();
//        }
//    }
}

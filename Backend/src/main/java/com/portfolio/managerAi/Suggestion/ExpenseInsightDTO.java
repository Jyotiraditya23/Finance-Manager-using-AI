package com.portfolio.managerAi.Suggestion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpenseInsightDTO {
    private String summary;
    private String period; // "weekly" or "monthly"
    private Map<String, Object> highlights;
    private LocalDateTime generatedAt;
}
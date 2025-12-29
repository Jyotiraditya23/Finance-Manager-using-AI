package com.portfolio.managerAi.Suggestion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpensePredictionDTO {
    private String amount;
    private String reason;
}

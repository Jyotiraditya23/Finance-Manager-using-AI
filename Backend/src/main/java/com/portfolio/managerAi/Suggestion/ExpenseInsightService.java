package com.portfolio.managerAi.Suggestion;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.portfolio.managerAi.dto.ExpenseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExpenseInsightService {

    private final GeminiService geminiService;
    private final Client client;


    public String askGemini(String prompt) {
        GenerateContentResponse response = client.models.generateContent(
                "gemini-2.5-flash",
                prompt,
                null
        );
        return response.text();
    }

    public ExpenseInsightDTO generateMonthlyInsight(List<ExpenseDTO> currentMonthExpenses,
                                                    List<ExpenseDTO> previousMonthExpenses) {
        // Build the prompt
        String prompt = buildMonthlyPrompt(currentMonthExpenses, previousMonthExpenses);

        // Ask Gemini
        String aiSummary = askGemini(prompt);

        // Build the insight DTO
        return ExpenseInsightDTO.builder()
                .summary(aiSummary)
                .period("monthly")
                .highlights(calculateMonthlyHighlights(currentMonthExpenses, previousMonthExpenses))
                .generatedAt(LocalDateTime.now())
                .build();
    }

    //for prediction of next month amount and reason for it
    public ExpensePredictionDTO buildNextMonthAmount(List<ExpenseDTO> current,
                                       List<ExpenseDTO> previous){
        Map<String, Object> highlights = calculateMonthlyHighlights(current,previous);

        StringBuilder prompt = new StringBuilder();
        prompt.append("This are my highlights from current and previous month give me a integer value for the prediction of next month expense calculation from previous trends.\n");
        prompt.append("I want to only integer no explanation because i want to save it in int value");
        for(String key : highlights.keySet()){
            prompt.append(key).append("=").append(highlights.get(key)).append("\n");
        }
        String amount = askGemini(prompt.toString());

        StringBuilder prompt2 = new StringBuilder();
        prompt2.append("This is my current month and last month highlights give me the reason behind the predicted amount so it help the user knowing the reason keep its length for 150-200 words \n")
                .append("The amount i provide is prediction of next month expense predicted by ai this prediction is made by u in earlier prompt \n\n")
                .append(amount).append("\n")
                .append("give the result to me in single paragraph dont add line breaks or point wise explanation");
        String reason = askGemini(prompt2.toString());

        return ExpensePredictionDTO.builder()
                .amount(amount)
                .reason(reason)
                .build();
    }

    /**
     * Builds a prompt for Gemini with totals and category breakdown
     */
    private String buildMonthlyPrompt(List<ExpenseDTO> current, List<ExpenseDTO> previous) {
        BigDecimal currentTotal = calculateTotal(current);
        BigDecimal previousTotal = calculateTotal(previous);
        Map<String, BigDecimal> categoryBreakdown = calculateCategoryTotals(current);

        StringBuilder prompt = new StringBuilder();
        prompt.append("You are a personal finance assistant. Generate a comprehensive monthly expense summary don't give to me in points or line break give it to me in paragraph in readble format.\n\n");
        prompt.append("Current month expenses: ₹").append(currentTotal).append("\n");
        prompt.append("Previous month expenses: ₹").append(previousTotal).append("\n\n");

        if (!categoryBreakdown.isEmpty()) {
            prompt.append("Category breakdown:\n");
            categoryBreakdown.forEach((cat, amt) ->
                    prompt.append("- ").append(cat).append(": ₹").append(amt).append("\n")
            );
        }

        prompt.append("\nProvide detailed insights in 3-4 sentences covering:\n");
        prompt.append("1. Month-over-month spending trend\n");
        prompt.append("2. Notable category changes\n");
        prompt.append("3. Spending patterns (weekends, specific times)\n");
        prompt.append("4. Actionable recommendations\n\n");
        prompt.append("Use a conversational, supportive tone. Keep it under 150 words give this all info in proper one paragraph without linebreak which will be easily displayed on frontend.");

        return prompt.toString();
    }

    /**
     * Calculate highlights for the monthly report
     */
    private Map<String, Object> calculateMonthlyHighlights(List<ExpenseDTO> current,
                                                           List<ExpenseDTO> previous) {
        Map<String, Object> highlights = new HashMap<>();
        BigDecimal currentTotal = calculateTotal(current);
        BigDecimal previousTotal = calculateTotal(previous);

        highlights.put("currentMonthTotal", currentTotal);
        highlights.put("previousMonthTotal", previousTotal);
        highlights.put("percentageChange", calculatePercentageChange(previousTotal, currentTotal));
        highlights.put("categoryBreakdown", calculateCategoryTotals(current));
        highlights.put("averageDailySpending", calculateAverageDailySpending(current));
        highlights.put("transactionCount", current.size());

        return highlights;
    }

    /**
     * Total amount spent
     */
    private BigDecimal calculateTotal(List<ExpenseDTO> expenses) {
        return expenses.stream()
                .map(ExpenseDTO::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private Map<String, BigDecimal> calculateCategoryTotals(List<ExpenseDTO> expenses) {
        return expenses.stream()
                .collect(Collectors.groupingBy(
                        e -> e.getCategoryName() != null ? e.getCategoryName() : "Uncategorized",
                        Collectors.reducing(BigDecimal.ZERO, ExpenseDTO::getAmount, BigDecimal::add)
                ));
    }

    private BigDecimal calculatePercentageChange(BigDecimal oldValue, BigDecimal newValue) {
        if (oldValue.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.valueOf(100);
        }
        return newValue.subtract(oldValue)
                .divide(oldValue, 2, BigDecimal.ROUND_HALF_UP)
                .multiply(BigDecimal.valueOf(100));
    }

    private BigDecimal calculateAverageDailySpending(List<ExpenseDTO> expenses) {
        if (expenses.isEmpty()) {
            return BigDecimal.ZERO;
        }

        LocalDate minDate = expenses.stream()
                .map(ExpenseDTO::getDate)
                .min(LocalDate::compareTo)
                .orElse(LocalDate.now());

        LocalDate maxDate = expenses.stream()
                .map(ExpenseDTO::getDate)
                .max(LocalDate::compareTo)
                .orElse(LocalDate.now());

        long days = java.time.temporal.ChronoUnit.DAYS.between(minDate, maxDate) + 1;
        BigDecimal total = calculateTotal(expenses);

        return total.divide(BigDecimal.valueOf(days), 2, BigDecimal.ROUND_HALF_UP);
    }


}

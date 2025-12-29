package com.portfolio.managerAi.Suggestion;


import com.portfolio.managerAi.dto.ExpenseDTO;
import com.portfolio.managerAi.dto.IncomeDTO;
import com.portfolio.managerAi.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("insights")
@RequiredArgsConstructor
public class ExpenseInsightController {

    private final ExpenseInsightService insightService;
    private final ExpenseService expenseService;

    /**
     * Get monthly expense insights
     */
    @GetMapping("/monthly")
    public ResponseEntity<ExpenseInsightDTO> getMonthlyInsight() {

        List<ExpenseDTO> currentMonth = expenseService.getCurrentMonthExpensesForCurrentUser(); // Replace with actual data
        List<ExpenseDTO> previousMonth = expenseService.getPreviousMonthExpensesForCurrentUser(); // Replace with actual data

        ExpenseInsightDTO insight = insightService.generateMonthlyInsight(currentMonth, previousMonth);
        return ResponseEntity.ok(insight);
    }

    @GetMapping("/prediction")
    public ResponseEntity<ExpensePredictionDTO> expensePrediction(){
        List<ExpenseDTO> currentMonth = expenseService.getCurrentMonthExpensesForCurrentUser(); // Replace with actual data
        List<ExpenseDTO> previousMonth = expenseService.getPreviousMonthExpensesForCurrentUser();
        ExpensePredictionDTO predictionDTO = insightService.buildNextMonthAmount(currentMonth,previousMonth);

        return ResponseEntity.ok(predictionDTO);
    }
}
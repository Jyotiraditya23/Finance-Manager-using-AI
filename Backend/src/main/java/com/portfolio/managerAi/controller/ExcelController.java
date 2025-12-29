package com.portfolio.managerAi.controller;

import com.portfolio.managerAi.service.ExcelService;
import com.portfolio.managerAi.service.ExpenseService;
import com.portfolio.managerAi.service.IncomeService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/excel")
@RequiredArgsConstructor
public class ExcelController {

    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @GetMapping("/download/income")
    public void downloadIncomeExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition","attachment; filename=income.xlsx");
        excelService.writeIncomeToExcel(response.getOutputStream(),incomeService.getCurrentMonthIncomeForCurrentUser());
    }

    @GetMapping("/download/expense")
    public void downloadExpenseExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition","attachment; filename=expense.xlsx");
        excelService.writeExpenseToExcel(response.getOutputStream(),expenseService.getCurrentMonthExpensesForCurrentUser());
    }
}

package com.portfolio.managerAi.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;


@Getter
@Setter
public class FinancialDataDTO {
    private List<IncomeDTO> incomes;
    private List<ExpenseDTO> expenses;
    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal surplusOrDeficit;
}

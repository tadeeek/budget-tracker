package com.tadeeek.budgettracker.demo.user;

import java.util.List;

import com.tadeeek.budgettracker.demo.expense.Expense;

import lombok.Data;

@Data
public class UserExpenseDTO {
    private Long userId;
    private List<Expense> expenses;
}

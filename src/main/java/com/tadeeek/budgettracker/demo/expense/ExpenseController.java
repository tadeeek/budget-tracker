package com.tadeeek.budgettracker.demo.expense;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExpenseController {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    private ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("/expenses")
    public List<Expense> getAllUserExpense(Authentication authentication) {
        return expenseService.getAllUserExpense(authentication);
    }

    @GetMapping("/expenses/{id}")
    public Expense getAllUserExpensesById(@PathVariable Long id, Authentication authentication) {

        return expenseService.getAllUserExpenseById(id, authentication);
    }

    @PostMapping("/expenses")
    public Expense addExpense(@Valid @RequestBody Expense expense, Authentication authentication) {
        return expenseService.saveExpense(expense, authentication);
    }

    @PutMapping("/expenses")
    public Expense updateExpense(@Valid @RequestBody Expense expense, Authentication authentication) {
        return expenseService.saveExpense(expense, authentication);
    }

    @DeleteMapping("/expenses/{id}")
    public String deletExpense(@PathVariable Long id, Authentication authentication) {
        expenseService.deleteExpense(id, authentication);

        return "Expense of id: " + id + " was deleted";
    }
}

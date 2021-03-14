package com.tadeeek.budgettracker.demo.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.tadeeek.budgettracker.demo.model.Expense;
import com.tadeeek.budgettracker.demo.repository.ExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseController(ExpenseRepository expenseRepository) {

        this.expenseRepository = expenseRepository;
    }

    @GetMapping("/expenses")
    public List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    @GetMapping("/expenses/{id}")
    public ResponseEntity<?> getExpensesById(@PathVariable Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.map(res -> ResponseEntity.ok().body(res)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/expenses")
    public ResponseEntity<Expense> addExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
        Expense result = expenseRepository.save(expense);

        return ResponseEntity.created(new URI("/api/expenses" + result.getId())).body(result);

    }

    @PutMapping("/expenses/{id}")
    public ResponseEntity<Expense> updateExpense(@Valid @RequestBody Expense expense) {
        Expense result = expenseRepository.save(expense);

        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<?> deletExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }
}

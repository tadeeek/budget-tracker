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

    @GetMapping("/categories")
    public List<Expense> categories() {
        return expenseRepository.findAll();
    }

    @GetMapping("/expense/{id}")
    public ResponseEntity<?> getexpense(@PathVariable Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.map(res -> ResponseEntity.ok().body(res)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/expense")
    public ResponseEntity<Expense> addexpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
        Expense result = expenseRepository.save(expense);

        return ResponseEntity.created(new URI("/api/expense" + result.getId())).body(result);

    }

    @PutMapping("/expense/{id}")
    public ResponseEntity<Expense> updateexpense(@Valid @RequestBody Expense expense) {
        Expense result = expenseRepository.save(expense);

        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/expense/{id}")
    public ResponseEntity<?> deleteexpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }
}

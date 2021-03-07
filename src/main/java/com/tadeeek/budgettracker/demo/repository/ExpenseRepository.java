package com.tadeeek.budgettracker.demo.repository;

import com.tadeeek.budgettracker.demo.model.Expense;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}

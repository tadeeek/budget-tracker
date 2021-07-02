package com.tadeeek.budgettracker.demo.expense;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // List<Expense> findAllByUserId()
}

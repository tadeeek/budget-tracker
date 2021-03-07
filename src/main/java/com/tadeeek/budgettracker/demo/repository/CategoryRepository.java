package com.tadeeek.budgettracker.demo.repository;

import com.tadeeek.budgettracker.demo.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByName(String name);

}

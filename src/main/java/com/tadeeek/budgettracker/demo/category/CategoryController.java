package com.tadeeek.budgettracker.demo.category;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.tadeeek.budgettracker.demo.exception.ApiRequestException;

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
@RequestMapping("/api/")
public class CategoryController {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    private final CategoryRepository categoryRepository;
    // private ExpenseRepository expenseRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        // in method ExpenseRepository expenseRepository
        // this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    public List<Category> categories(Authentication authentication) {

        // in method : Authentication authentication

        // MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        // String username = myUserDetails.getUsername();
        // List<Category> categories = categoryRepository.findAll();
        // return categories.stream().filter(it ->
        // it.getUser().getUserName().equals(username))
        // .collect(Collectors.toList());

        // in method: Authentication authentication
        // MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        // String username = myUserDetails.getUsername();
        // List<Expense> expenses = expenseRepository.findAll();
        // return expenses.stream().filter(it ->
        // it.getUser().getUserName().equals(username))
        // .map(expense -> expense.getCategory()).collect(Collectors.toList());

        // return categories;

        return categoryRepository.findAll();
    }

    @GetMapping("/categories/{id}")
    public Category getCategory(@PathVariable Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        Category theCategory = null;

        if (category.isPresent()) {
            theCategory = category.get();
        } else {
            throw new ApiRequestException("Did not find category id - " + id);
        }

        return theCategory;
    }

    @PostMapping("/categories")
    public Category addCategory(@Valid @RequestBody Category category) {
        categoryRepository.save(category);

        return category;
    }

    @PutMapping("/categories")
    public Category updateCategory(@Valid @RequestBody Category category) {

        categoryRepository.save(category);

        return category;
    }

    @DeleteMapping("/categories/{id}")
    public String deleteCategory(@PathVariable Long id) {

        Optional<Category> theCategory = categoryRepository.findById(id);

        if (theCategory == null) {
            throw new ApiRequestException("Did not find category id - " + id + " to delete.");
        }
        categoryRepository.deleteById(id);

        return "Category of id: " + id + " was deleted";
    }
}

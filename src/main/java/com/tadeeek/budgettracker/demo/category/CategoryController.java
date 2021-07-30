package com.tadeeek.budgettracker.demo.category;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
public class CategoryController {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    private CategoryService userCategoryMapService;

    @Autowired
    public CategoryController(CategoryService userCategoryMapService) {
        this.userCategoryMapService = userCategoryMapService;

    }

    @GetMapping("/categories")
    public List<Category> getAllUserCategory(Authentication authentication) {

        return userCategoryMapService.getAllUserCategory(authentication);
    };

    @GetMapping("/categories/{id}")
    public Category getAllUserCategoryById(@PathVariable Long id, Authentication authentication) {

        return userCategoryMapService.getAllUserCategoryById(id, authentication);
    }

    @PostMapping("/categories")
    public Category addCategory(@Valid @RequestBody Category category, Authentication authentication) {

        return userCategoryMapService.saveCategory(category, authentication);
    }

    @PutMapping("/categories")
    public Category updateCategory(@Valid @RequestBody Category category, Authentication authentication) {

        return userCategoryMapService.saveCategory(category, authentication);
    }

    @DeleteMapping("/categories/{id}")
    public String deleteCategory(@PathVariable Long id, Authentication authentication) {

        userCategoryMapService.deleteCategory(id, authentication);

        return "Category of id: " + id + " was deleted";
    }

}

package com.tadeeek.budgettracker.demo.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import javax.validation.Valid;

import com.tadeeek.budgettracker.demo.category.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api2")
public class UserCategoryMapController {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    @Autowired
    private UserCategoryMapService userCategoryMapService;

    @GetMapping("/categories")
    public UserCategoryDTO getAllUserCategory(Authentication authentication) {

        return userCategoryMapService.getAllUserCategory(authentication);
    };

    @GetMapping("/categories/{id}")
    public Category getAllUserCategoryById(@PathVariable Long id, Authentication authentication) {

        return userCategoryMapService.getAllUserCategoryById(id, authentication);
    }

    @PostMapping("/categories")
    public Category addCategory(@Valid @RequestBody Category category, Authentication authentication) {

        return userCategoryMapService.save(category, authentication);
    }

    @PutMapping("/categories")
    public Category updateCategory(@Valid @RequestBody Category category, Authentication authentication) {

        return userCategoryMapService.save(category, authentication);
    }

}

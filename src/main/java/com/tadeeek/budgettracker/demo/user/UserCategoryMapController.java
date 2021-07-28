package com.tadeeek.budgettracker.demo.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import com.tadeeek.budgettracker.demo.category.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

        UserCategoryDTO userCategory = userCategoryMapService.getAllUserCategory(authentication);
        return userCategory;
    };

    @GetMapping("/categories/{id}")
    public Category getAllUserCategoryById(@PathVariable Long id, Authentication authentication) {

        Category category = userCategoryMapService.getAllUserCategoryById(id, authentication);

        return category;
    }

}

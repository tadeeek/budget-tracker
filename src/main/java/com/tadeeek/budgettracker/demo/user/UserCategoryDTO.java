package com.tadeeek.budgettracker.demo.user;

import java.util.List;

import com.tadeeek.budgettracker.demo.category.Category;

import lombok.Data;

@Data
public class UserCategoryDTO {
    private Long userId;
    private List<Category> categories;
}

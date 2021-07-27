package com.tadeeek.budgettracker.demo.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dto")
public class UserCategoryMapController {

    @Autowired
    private UserCategoryMapService userCategoryMapService;

    @GetMapping("/categories")
    public List<UserCategoryDTO> getAllUserCategory() {

        List<UserCategoryDTO> userCategory = userCategoryMapService.getAllUserCategory();

        return userCategory;
    }
}

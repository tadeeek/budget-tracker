package com.tadeeek.budgettracker.demo.user;

import java.util.List;
import java.util.stream.Collectors;

import com.tadeeek.budgettracker.demo.category.Category;
import com.tadeeek.budgettracker.demo.category.CategoryRepository;
import com.tadeeek.budgettracker.demo.exception.ApiRequestException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCategoryMapService {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private UserCategoryDTO convertToUserCategoryDTO(User user) {
        // Mapping fields
        UserCategoryDTO userCategoryDTO = new UserCategoryDTO();
        userCategoryDTO.setUserId(user.getUserId());
        List<Category> categories = user.getCategories();
        userCategoryDTO.setCategories(categories);
        return userCategoryDTO;
    }

    public UserCategoryDTO getAllUserCategory(Authentication authentication) {

        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        long userId = myUserDetails.getUserId();

        // get first and only user
        UserCategoryDTO userCategoryDTO = ((List<User>) userRepository.findAll()).stream()
                .map(this::convertToUserCategoryDTO).filter(it -> it.getUserId().equals(userId))
                .collect(Collectors.toList()).get(0);

        return userCategoryDTO;
    }

    public Category getAllUserCategoryById(Long id, Authentication authentication) {

        // get user categories and find by id, and get first
        // check for gettin 0 and fix error
        List<Category> categories = getAllUserCategory(authentication).getCategories().stream()
                .filter(it -> it.getId().equals(id)).collect(Collectors.toList());

        if (categories == null) {
            throw new ApiRequestException("Did not find category id - " + id);
        } else {
            return categories.get(0);
        }
    }

    public Category save(Category category, Authentication authentication) {

        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();

        long userId = myUserDetails.getUserId();

        User user = new User();
        user.setUserId(userId);

        category.setUser(user);
        categoryRepository.save(category);

        return category;
    }

}

package com.tadeeek.budgettracker.demo.category;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.tadeeek.budgettracker.demo.exception.ApiRequestException;
import com.tadeeek.budgettracker.demo.user.MyUserDetails;
import com.tadeeek.budgettracker.demo.user.MyUser;
import com.tadeeek.budgettracker.demo.user.UserCategoryDTO;
import com.tadeeek.budgettracker.demo.user.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(UserRepository userRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    private UserCategoryDTO convertToUserCategoryDTO(MyUser user) {
        // Mapping fields
        UserCategoryDTO userCategoryDTO = new UserCategoryDTO();
        userCategoryDTO.setUserId(user.getUserId());
        List<Category> categories = user.getCategories();
        userCategoryDTO.setCategories(categories);
        return userCategoryDTO;
    }

    public List<Category> getAllUserCategory(Authentication authentication) {

        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        long userId = myUserDetails.getUserId();

        // get first and only user
        List<Category> categories = ((List<MyUser>) userRepository.findAll()).stream()
                .map(this::convertToUserCategoryDTO).filter(it -> it.getUserId().equals(userId))
                .collect(Collectors.toList()).get(0).getCategories();

        return categories;
    }

    public Category getAllUserCategoryById(Long id, Authentication authentication) {

        // get user categories and find by id, and get first
        List<Category> categories = getAllUserCategory(authentication).stream().filter(it -> it.getId().equals(id))
                .collect(Collectors.toList());

        if (categories.size() <= 0) {
            throw new ApiRequestException("Did not find category id - " + id);
        }
        return categories.get(0);
    }

    public Category saveCategory(Category category, Authentication authentication) {

        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        long userId = myUserDetails.getUserId();

        MyUser user = new MyUser();
        user.setUserId(userId);

        category.setUser(user);
        categoryRepository.save(category);

        return category;
    }

    public void deleteCategory(Long id, Authentication authentication) {

        Optional<Category> category = categoryRepository.findById(id);

        if (category.isPresent()) {
            categoryRepository.deleteById(id);
        } else {
            throw new ApiRequestException("Did not find category id - " + id);
        }

    }
}

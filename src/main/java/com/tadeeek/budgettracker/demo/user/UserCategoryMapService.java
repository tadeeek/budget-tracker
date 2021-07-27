package com.tadeeek.budgettracker.demo.user;

import java.util.List;
import java.util.stream.Collectors;

import com.tadeeek.budgettracker.demo.category.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCategoryMapService {

    @Autowired
    private UserRepository userRepository;
//this does not have to be List but just UserCategoryDto... 
    public List<UserCategoryDTO> getAllUserCategory() {
        return ((List<User>) userRepository.findAll()).stream().map(this::convertToUserCategoryDTO)
                .collect(Collectors.toList());
    }

    private UserCategoryDTO convertToUserCategoryDTO(User user) {
        // Mapping fields
        UserCategoryDTO userCategoryDTO = new UserCategoryDTO();
        userCategoryDTO.setUserId(user.getUserId());
        List<Category> categories = user.getCategories();
        userCategoryDTO.setCategories(categories);
        return userCategoryDTO;
    }

}

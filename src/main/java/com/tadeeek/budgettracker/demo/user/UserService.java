package com.tadeeek.budgettracker.demo.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

@Service
public class UserService {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserName(user.getUserName());
        userDTO.setName(user.getName());

        return userDTO;
    }

    public UserDTO getCurrentUser(Authentication authentication) {

        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        long userId = myUserDetails.getUserId();

        UserDTO user = ((List<User>) userRepository.findAll()).stream().map(this::convertToUserDTO)
                .filter(it -> it.getUserId().equals(userId)).collect(Collectors.toList()).get(0);

        return user;

    }

    public User saveUser(final User user) {

        // check if user exists, if yes throw error if not, populate user
        User userModel = populateUser(user);

        return userRepository.save(userModel);

    }

    private User populateUser(final User user) {
        User userModel = new User();

        userModel.setName(user.getName());
        userModel.setUserName(user.getUserName());
        userModel.setEmail(user.getEmail());
        userModel.setPassword(passwordEncoder.encode(user.getPassword()));
        userModel.setRoles("ROLE_USER");
        return userModel;
    }

}

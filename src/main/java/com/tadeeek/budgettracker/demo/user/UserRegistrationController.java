package com.tadeeek.budgettracker.demo.user;

import javax.validation.Valid;

import com.tadeeek.budgettracker.demo.exception.UserExistsException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRegistrationController {

    private UserService userService;

    @Autowired
    public UserRegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    public MyUser registerUser(@Valid @RequestBody MyUser user) throws UserExistsException {

        return userService.saveUser(user);

    }

}

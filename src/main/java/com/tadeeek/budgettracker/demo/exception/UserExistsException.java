package com.tadeeek.budgettracker.demo.exception;

public class UserExistsException extends Exception {
    private String username;

    public static UserExistsException createWith(String username) {
        return new UserExistsException(username);
    }

    public UserExistsException(String username) {
        this.username = username;
    }

    @Override
    public String getMessage() {
        return "User '" + username + "' already exists";
    }

}

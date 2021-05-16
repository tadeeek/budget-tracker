package com.tadeeek.budgettracker.demo.repository;

import java.util.Optional;

import com.tadeeek.budgettracker.demo.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUserName(String userName);

}

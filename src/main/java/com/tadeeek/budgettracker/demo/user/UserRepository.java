package com.tadeeek.budgettracker.demo.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<MyUser, Integer> {

    Optional<MyUser> findByUserName(String userName);

}

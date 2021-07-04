package com.tadeeek.budgettracker.demo.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String email;
    private String password;
    private String roles;

    // @OneToMany(mappedBy = "expense", cascade = { CascadeType.PERSIST,
    // CascadeType.MERGE, CascadeType.MERGE,
    // CascadeType.DETACH })
    // private List<Expense> expenses;

    // @OneToMany(mappedBy = "category")
    // private List<Category> categories = new ArrayList<>();

}

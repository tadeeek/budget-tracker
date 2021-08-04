package com.tadeeek.budgettracker.demo.user;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.tadeeek.budgettracker.demo.category.Category;
import com.tadeeek.budgettracker.demo.expense.Expense;

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
    private String name;
    private String email;
    private String password;
    private String roles;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Category> categories;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Expense> expenses;
}

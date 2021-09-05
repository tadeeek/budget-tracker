package com.tadeeek.budgettracker.demo.user;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.tadeeek.budgettracker.demo.category.Category;
import com.tadeeek.budgettracker.demo.expense.Expense;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotEmpty(message = "Username should not be empty")
    @Size(max = 16, message = "Username is too long. Should have maximum 16 characters")
    private String userName;

    private String name;

    @NotEmpty(message = "E-mail should not be empty")
    @Email(message = "Invalid e-email format")
    private String email;

    @NotEmpty(message = "Password should not be empty")
    private String password;

    private String roles;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Category> categories;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Expense> expenses;
}

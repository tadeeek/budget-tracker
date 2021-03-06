package com.tadeeek.budgettracker.demo.category;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tadeeek.budgettracker.demo.expense.Expense;
import com.tadeeek.budgettracker.demo.user.MyUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @NotEmpty(message = "Category name should not be empty")
    @Size(max = 16, message = "Category name is too long. Should have maximum 16 characters")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Expense> expenses;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private MyUser user;

}

package com.tadeeek.budgettracker.demo.expense;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tadeeek.budgettracker.demo.category.Category;
import com.tadeeek.budgettracker.demo.user.User;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate expenseDate;

    @NotEmpty(message = "Description should not be empty")
    @Size(max = 32, message = "Description is too long. Should have maximum 16 characters")
    private String description;

    @NotEmpty(message = "Location should not be empty")
    @Size(max = 16, message = "Location name is too long. Should have maximum 16 characters")
    private String location;

    @Min(value = 0, message = "Price have to be greater than 0")
    private double price;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;

    @JsonIgnore
    @ManyToOne
    private User user;

}

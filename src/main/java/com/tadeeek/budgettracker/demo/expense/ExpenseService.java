package com.tadeeek.budgettracker.demo.expense;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.tadeeek.budgettracker.demo.exception.ApiRequestException;
import com.tadeeek.budgettracker.demo.user.MyUserDetails;
import com.tadeeek.budgettracker.demo.user.MyUser;
import com.tadeeek.budgettracker.demo.user.UserExpenseDTO;
import com.tadeeek.budgettracker.demo.user.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(UserRepository userRepository, ExpenseRepository expenseRepository) {
        this.userRepository = userRepository;
        this.expenseRepository = expenseRepository;
    }

    private UserExpenseDTO convertToUserExpenseDTO(MyUser user) {
        // Mapping fields
        UserExpenseDTO userExpenseDTO = new UserExpenseDTO();
        userExpenseDTO.setUserId(user.getUserId());
        List<Expense> expenses = user.getExpenses();
        userExpenseDTO.setExpenses(expenses);
        return userExpenseDTO;
    }

    public List<Expense> getAllUserExpense(Authentication authentication) {

        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        long userId = myUserDetails.getUserId();

        // get first and only user
        List<Expense> expenses = ((List<MyUser>) userRepository.findAll()).stream().map(this::convertToUserExpenseDTO)
                .filter(it -> it.getUserId().equals(userId)).collect(Collectors.toList()).get(0).getExpenses();

        return expenses;
    }

    public Expense getAllUserExpenseById(Long id, Authentication authentication) {

        // get user expenses and find by id, and get first
        List<Expense> expenses = getAllUserExpense(authentication).stream().filter(it -> it.getId().equals(id))
                .collect(Collectors.toList());

        if (expenses.size() <= 0) {
            throw new ApiRequestException("Did not find expense id - " + id);
        }
        return expenses.get(0);
    }

    public Expense saveExpense(Expense expense, Authentication authentication) {

        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        long userId = myUserDetails.getUserId();

        MyUser user = new MyUser();
        user.setUserId(userId);

        expense.setUser(user);
        expenseRepository.save(expense);

        return expense;
    }

    public void deleteExpense(Long id, Authentication authentication) {

        Optional<Expense> category = expenseRepository.findById(id);

        if (category.isPresent()) {
            expenseRepository.deleteById(id);
        } else {
            throw new ApiRequestException("Did not find expense id - " + id);
        }

    }
}

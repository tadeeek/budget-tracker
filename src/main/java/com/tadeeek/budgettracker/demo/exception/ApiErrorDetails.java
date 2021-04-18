package com.tadeeek.budgettracker.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
public class ApiErrorDetails {
    private String object;
    private String field;
    private Object rejectedValue;
    private String message;

    ApiErrorDetails(String object, String message) {
        this.object = object;
        this.message = message;
    }
}
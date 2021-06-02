package com.tadeeek.budgettracker.demo.exception;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.StringJoiner;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ApiError {
    public ApiError(ZonedDateTime timestamp, HttpStatus httpStatus, String message) {
        this.timestamp = timestamp;
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public ApiError(ZonedDateTime timestamp, HttpStatus httpStatus, String message, List<ApiErrorDetails> details) {
        this.timestamp = timestamp;
        this.httpStatus = httpStatus;
        this.message = message;
        this.details = details;
    }

    private ZonedDateTime timestamp;
    private HttpStatus httpStatus;
    private String message;
    private List<ApiErrorDetails> details;

    // w/o details so far...
    public String toJson() {
        return new StringJoiner(", ", "{", "}").add("\"timestamp\": \"" + timestamp + "\"")
                .add("\"httpStatus\": \"" + httpStatus + "\"").add("\"message\": \"" + message + "\"").toString();
    }

}
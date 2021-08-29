package com.tadeeek.budgettracker.demo.exception;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.StringJoiner;

import lombok.Data;

@Data
public class ApiError {
    public ApiError(ZonedDateTime timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;
    }

    public ApiError(ZonedDateTime timestamp, String message, List<ApiErrorDetails> details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

    private ZonedDateTime timestamp;
    private String message;
    private List<ApiErrorDetails> details;

    // w/o details so far...
    public String toJson() {
        return new StringJoiner(", ", "{", "}").add("\"timestamp\": \"" + timestamp + "\"")
                .add("\"message\": \"" + message + "\"").toString();
    }

}
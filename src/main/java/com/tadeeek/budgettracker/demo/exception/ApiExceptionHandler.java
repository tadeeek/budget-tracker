package com.tadeeek.budgettracker.demo.exception;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { ApiRequestException.class })
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException ex) {

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        ApiError apiException = new ApiError(ZonedDateTime.now(), badRequest, ex.getMessage());

        return new ResponseEntity<>(apiException, badRequest);
    }

    // Form validation error
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        List<ApiErrorDetails> details = new ArrayList<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            details.add(new ApiErrorDetails(error.getField(), error.getDefaultMessage()));
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            details.add(new ApiErrorDetails(error.getObjectName(), error.getDefaultMessage()));
        }
        ApiError apiException = new ApiError(ZonedDateTime.now(), badRequest, ex.getMessage(), details);

        return new ResponseEntity(apiException, badRequest);
    }

    // Invalid data format
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        String error = "Invalid JSON data format";

        ApiError apiException = new ApiError(ZonedDateTime.now(), badRequest, error);

        return new ResponseEntity(apiException, badRequest);
    }

    // }

    // @ExceptionHandler(ResourceNotFoundException.class)
    // public ResponseEntity<?> resourceNotFoundException(ResourceNotFoundException
    // ex, WebRequest request) {

    // ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND);
    // errorResponse.setMessage(ex.getMessage());

    // return createResponseEntity(errorResponse);
    // }

}
package com.tadeeek.budgettracker.demo.exception;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.lang.Nullable;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.util.WebUtils;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    // Exception handler for all types
    @ExceptionHandler({ UserExistsException.class, ApiRequestException.class })
    public ResponseEntity<Object> handleApiRequestException(Exception ex, WebRequest request) {
        HttpStatus status;

        HttpHeaders headers = new HttpHeaders();

        if (ex instanceof ApiRequestException) {
            status = HttpStatus.BAD_REQUEST;
            ApiRequestException exep = (ApiRequestException) ex;

            return new ResponseEntity<>(exep, status);

        } else if (ex instanceof MethodArgumentNotValidException) {
            // Find way to delegate here methodargumentnotvalidexception and handle it here
            status = HttpStatus.BAD_REQUEST;
            MethodArgumentNotValidException exep = (MethodArgumentNotValidException) ex;
            return handleMethodArgumentNotValid(exep, headers, status, request);
        }

        else if (ex instanceof UserExistsException) {
            status = HttpStatus.BAD_REQUEST;
            UserExistsException exep = (UserExistsException) ex;
            return handleUserExistsException(exep, status, request);

        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            Exception exep = new Exception();
            return handleExceptionInternal(exep, null, status, request);
        }
    }

    protected ResponseEntity<Object> handleUserExistsException(UserExistsException ex, HttpStatus status,
            WebRequest request) {

        ApiError apiError = new ApiError(ZonedDateTime.now(), ex.getMessage());

        return handleExceptionInternal(ex, apiError, status, request);
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
        ApiError apiException = new ApiError(ZonedDateTime.now(), ex.getMessage(), details);

        return new ResponseEntity(apiException, badRequest);
    }

    // Invalid data format - handle this
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        String error = "Invalid JSON data format";

        ApiError apiException = new ApiError(ZonedDateTime.now(), error);

        return new ResponseEntity(apiException, badRequest);
    }

    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, @Nullable ApiError body, HttpStatus status,
            WebRequest request) {
        if (HttpStatus.INTERNAL_SERVER_ERROR.equals(status)) {
            request.setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE, ex, WebRequest.SCOPE_REQUEST);
        }
        return new ResponseEntity<>(body, status);
    }

}
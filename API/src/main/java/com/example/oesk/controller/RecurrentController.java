package com.example.oesk.controller;

import com.example.oesk.repository.RecurrentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recurrents")
public class RecurrentController {

    @Autowired
    private RecurrentRepository recurrentRepository;

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteRecurrent(@PathVariable Long id) {
        try {
            recurrentRepository.deleteById(id);
        } catch( Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
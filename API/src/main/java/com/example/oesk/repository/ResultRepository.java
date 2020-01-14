package com.example.oesk.repository;

import java.util.List;
import java.util.Optional;

import com.example.oesk.model.Result;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Sort;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    Optional<Result> findById(Long resultId);

    List<Result> findByIdIn(List<Long> resultId);

    List<Result> findByIdIn(List<Long> resultId, Sort sort);
} 
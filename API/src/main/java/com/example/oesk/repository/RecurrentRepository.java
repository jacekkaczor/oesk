package com.example.oesk.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import com.example.oesk.model.Recurrent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Sort;

@Repository
public interface RecurrentRepository extends JpaRepository<Recurrent, Long> {
    Optional<Recurrent> findById(Long recurrentId);

    @Query(value = "select r from Recurrent r where r.repetitions <> 0 and  r.start <= ?1")
    List<Recurrent> findAllActual(Instant actualTime);

    List<Recurrent> findByIdIn(List<Long> recurrentId);

    List<Recurrent> findByIdIn(List<Long> recurrentId, Sort sort);
} 
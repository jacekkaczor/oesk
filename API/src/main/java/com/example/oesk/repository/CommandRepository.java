package com.example.oesk.repository;

import java.util.List;
import java.util.Optional;

import com.example.oesk.model.Command;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Sort;

@Repository
public interface CommandRepository extends JpaRepository<Command, Long> {
    Optional<Command> findById(Long commandId);

    Optional<Command> findByUrlAndNAndC(String url, int n, int c);

    List<Command> findByUrl(String url);

    @Query(value = "select c.url from Command c group by c.url")
    List<String> findAllUrls();

    List<Command> findByIdIn(List<Long> commandId);

    List<Command> findByIdIn(List<Long> commandId, Sort sort);
} 
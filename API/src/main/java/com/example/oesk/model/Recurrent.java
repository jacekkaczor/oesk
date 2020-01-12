package com.example.oesk.model;

import java.time.Instant;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "recurrents")
public class Recurrent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private int frequency;

    @NotNull
    private int repetitions;

    @Column
    private Instant start;

    @ManyToOne(fetch = FetchType.EAGER)
    private Command command;

    public Recurrent(@NotNull int frequency, @NotNull int repetitions, Instant start, Command command) {
        this.frequency = frequency;
        this.repetitions = repetitions;
        this.start = start;
        this.command = command;
    }

    public Recurrent() { }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }

    public Instant getStart() {
        return start;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Command getCommand() {
        return command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }
}
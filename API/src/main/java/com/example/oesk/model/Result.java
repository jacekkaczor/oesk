package com.example.oesk.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.oesk.model.audit.DateAudit;

@Entity
@Table(name = "results")
public class Result extends DateAudit {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private int min;

    @NotNull
    private int mean;

    @NotNull    
    private double sd;

    @NotNull
    private int median;

    @NotNull
    private int max;

    @NotBlank
    @Size(max = 40)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    private Command command;

    public Result() {
        this.status = Status.REQUESTED.name();
    }

    public Result(Command command) { 
        this.command = command;
        this.status = Status.REQUESTED.name();
    }

    public Result(@NotNull int min, @NotNull int mean, @NotNull double sd, @NotNull int median, @NotNull int max,
            Command command) {
        this.min = min;
        this.mean = mean;
        this.sd = sd;
        this.median = median;
        this.max = max;
        this.command = command;
        this.status = Status.REQUESTED.name();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getMean() {
        return mean;
    }

    public void setMean(int mean) {
        this.mean = mean;
    }

    public double getSd() {
        return sd;
    }

    public void setSd(double sd) {
        this.sd = sd;
    }

    public int getMedian() {
        return median;
    }

    public void setMedian(int median) {
        this.median = median;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public Command getCommand() {
        return command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
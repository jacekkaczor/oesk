package com.example.oesk.payload;

import java.time.Instant;

public class ResultResponse {
    private Long id;
    private int min;
    private int mean;
    private double sd;
    private int median;
    private int max;
    private String status;
    private Instant creationDateTime;
    // private CommandResponse commandResponse;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    // public CommandResponse getCommandResponse() {
    //     return commandResponse;
    // }

    // public void setCommandResponse(CommandResponse commandResponse) {
    //     this.commandResponse = commandResponse;
    // }
}
package com.example.oesk.payload;

import java.time.Instant;
import java.util.Set;

public class CommandResponse {
    private Long id;
    private int n;
    private int c;
    private String url;
    private Set<ResultResponse> results;
    private Instant creationDateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getN() {
        return n;
    }

    public void setN(int n) {
        this.n = n;
    }

    public int getC() {
        return c;
    }

    public void setC(int c) {
        this.c = c;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public Set<ResultResponse> getResults() {
        return results;
    }

    public void setResults(Set<ResultResponse> results) {
        this.results = results;
    }
}
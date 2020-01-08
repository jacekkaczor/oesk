package com.example.oesk.model;

import java.io.InputStream;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.oesk.OeskApplication;
import com.example.oesk.model.audit.DateAudit;
import com.example.oesk.repository.ResultRepository;

import org.apache.commons.io.IOUtils;

@Entity
@Table(name = "commands")
public class Command extends DateAudit {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private int n;

    @NotNull
    private int c;

    @NotBlank
    @Size(max = 40)
    private String url;

    @OneToMany(
        fetch = FetchType.LAZY, 
        mappedBy = "command",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private Set<Result> results = new HashSet<>();

    public Command() {}    

    public Command(@NotBlank int n, @NotBlank int c, @NotBlank @Size(max = 40) String url) {
        this.n = n;
        this.c = c;
        this.url = url;
    }

    public boolean execute(Result result, ResultRepository resultRepository) {
        ProcessBuilder pb = new ProcessBuilder(
            System.getProperty("user.dir") + "\\ab.exe", 
            "-n" + this.n, 
            "-c" + this.c, 
            this.url
        );
        String times = "";
        OeskApplication.abExecution.lock();
        try {
            result.setStatus(Status.PROCESSING.name());
            resultRepository.save(result);
            Process p = pb.start();
            InputStream processInputStream = p.getInputStream();
            times = IOUtils.toString(processInputStream, "UTF-8");
            p.waitFor();
            if(times.lines().count() > 0) {
                this.saveResult(times, result);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            OeskApplication.abExecution.unlock();
        }
        return false;
    }

    private void saveResult(String times, Result result) {
        times = times.lines().toArray()[31].toString();
        String[] timesTable = times.split("\\s+");
        result.setMin(Integer.parseInt(timesTable[1])); 
        result.setMean(Integer.parseInt(timesTable[2])); 
        result.setMedian(Integer.parseInt(timesTable[4]));
        result.setMax(Integer.parseInt(timesTable[5]));
        result.setSd(Double.parseDouble(timesTable[3]));
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

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

    public Set<Result> getResults() {
        return results;
    }

    public void setResults(Set<Result> results) {
        this.results = results;
    }
}
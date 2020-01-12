package com.example.oesk.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import com.example.oesk.model.Recurrent;
import com.example.oesk.repository.RecurrentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class RecurrentService {

    @Autowired
    private RecurrentRepository recurrentRepository;

    @Autowired
    private CommandService commandService;


    @Scheduled(cron = "0 * * * * *") // every minute
    public void checkRecurrent() {
        Instant actualTime = Instant.now();
        List<Recurrent> recurrents = recurrentRepository.findAllActual(actualTime);
        for (Recurrent recurrent: recurrents) {
            if (ChronoUnit.MINUTES.between(recurrent.getStart(), actualTime) % recurrent.getFrequency() == 0) {
                int repetitions = recurrent.getRepetitions();
                if (repetitions != 0) {
                    recurrent.setRepetitions(repetitions - 1);
                }
                commandService.startExecutingCommand(recurrent.getCommand());
                if (recurrent.getRepetitions() == 0) {
                    recurrentRepository.delete(recurrent);
                } else {
                    recurrentRepository.save(recurrent);
                }
            }
        }
    }
}
package com.example.oesk.util;

import java.util.Set;
import java.util.stream.Collectors;

import com.example.oesk.model.Command;
import com.example.oesk.payload.CommandResponse;
import com.example.oesk.payload.ResultResponse;

public class ModelMapper {

    public static CommandResponse mapCommandToCommandResponse(Command command) {
        CommandResponse commandResponse = new CommandResponse();
        commandResponse.setId(command.getId());
        commandResponse.setN(command.getN());
        commandResponse.setC(command.getC());
        commandResponse.setUrl(command.getUrl());
        commandResponse.setCreationDateTime(command.getCreatedAt());

        Set<ResultResponse> resultResponses = command.getResults().stream().map(result -> {
            ResultResponse resultResponse = new ResultResponse();
            resultResponse.setId(result.getId());
            resultResponse.setMin(result.getMin());
            resultResponse.setMax(result.getMax());
            resultResponse.setMean(result.getMean());
            resultResponse.setMedian(result.getMedian());
            resultResponse.setSd(result.getSd());
            resultResponse.setStatus(result.getStatus());
            resultResponse.setCreationDateTime(result.getCreatedAt());
            return resultResponse;
        }).collect(Collectors.toSet());

        commandResponse.setResults(resultResponses);

        return commandResponse;
    }
}
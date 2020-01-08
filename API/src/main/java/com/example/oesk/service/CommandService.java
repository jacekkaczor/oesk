package com.example.oesk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.oesk.exception.BadRequestException;
import com.example.oesk.exception.ResourceNotFoundException;
import com.example.oesk.model.Command;
import com.example.oesk.payload.CommandRequest;
import com.example.oesk.payload.CommandResponse;
import com.example.oesk.payload.PagedResponse;
import com.example.oesk.repository.CommandRepository;
import com.example.oesk.util.AppConstants;
import com.example.oesk.util.ModelMapper;

@Service
public class CommandService {
    @Autowired
    private CommandRepository commandRepository;

    public PagedResponse<CommandResponse> getAllCommands(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Commands
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Command> commands = commandRepository.findAll(pageable);

        if(commands.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), commands.getNumber(),
                commands.getSize(), commands.getTotalElements(), commands.getTotalPages(), commands.isLast());
        }

        List<CommandResponse> commandResponses = commands.map(command -> {
            return ModelMapper.mapCommandToCommandResponse(command);
        }).getContent();

        return new PagedResponse<>(commandResponses, commands.getNumber(),
            commands.getSize(), commands.getTotalElements(), commands.getTotalPages(), commands.isLast());
    }

    public List<String> getAllUrls() {
        return commandRepository.findAllUrls();
    }

    public Command createCommand(CommandRequest commandRequest) {
        Optional<Command> commandOptional = commandRepository.findByUrlAndNAndC(commandRequest.getUrl(), commandRequest.getN(), commandRequest.getC());
        if (commandOptional.isPresent()) {
            return commandOptional.get();
        } else {
            Command command = new Command();
            command.setN(commandRequest.getN());
            command.setC(commandRequest.getC());
            command.setUrl(commandRequest.getUrl());        
            return commandRepository.save(command);
        }
    }
    
    public CommandResponse getCommandById(Long commandId) {
        Command command = commandRepository.findById(commandId).orElseThrow(
                () -> new ResourceNotFoundException("Command", "id", commandId));
        return ModelMapper.mapCommandToCommandResponse(command);
    }

    public List<CommandResponse> getCommandsByUrl(String url) {
        List<Command> commands = commandRepository.findByUrlContaining(url);

        List<CommandResponse> commandResponses = commands.stream().map(command -> {
            return ModelMapper.mapCommandToCommandResponse(command);
        }).collect(Collectors.toList());
        return commandResponses;
    }

    public CommandResponse getCommandByParameters(String url, int n, int c) {
        Command command = commandRepository.findByUrlAndNAndC(url, n, c).orElseThrow(
            () -> new ResourceNotFoundException("Command", "url", url));
        return ModelMapper.mapCommandToCommandResponse(command);
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
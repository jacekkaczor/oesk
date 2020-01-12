package com.example.oesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

import com.example.oesk.model.Command;
import com.example.oesk.model.Recurrent;
import com.example.oesk.payload.ApiResponse;
import com.example.oesk.payload.CommandRequest;
import com.example.oesk.payload.CommandResponse;
import com.example.oesk.payload.PagedResponse;
import com.example.oesk.repository.CommandRepository;
import com.example.oesk.repository.RecurrentRepository;
import com.example.oesk.service.CommandService;
import com.example.oesk.util.AppConstants;

import java.net.URI;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/api/commands")
public class CommandController {

    @Autowired
    private CommandRepository commandRepository;

    @Autowired
    private RecurrentRepository recurrentRepository;

    @Autowired
    private CommandService commandService;

    @GetMapping
    public PagedResponse<CommandResponse> getCommands(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return commandService.getAllCommands(page, size);
    }

    @GetMapping("/urls")
    public List<String> getUrls() {
        return commandService.getAllUrls();
    }

    @PostMapping
    public ResponseEntity<?> createCommand(@Valid @RequestBody CommandRequest commandRequest) {
        Command command = commandService.createCommand(commandRequest);
        
        if (commandRequest.getRepetitions() == 0 && commandRequest.getFrequency() == 0) {
            // start command executing
            commandService.startExecutingCommand(command);
        } else {
            if (commandRequest.getStart() == null) {
                commandRequest.setStart(Instant.now().truncatedTo(ChronoUnit.MINUTES));
            }
            Recurrent recurrent = new Recurrent(commandRequest.getFrequency(), commandRequest.getRepetitions(), commandRequest.getStart(), command);
            recurrentRepository.save(recurrent);
        }
        
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{commandId}")
                .buildAndExpand(command.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "ApacheBench Command Created Successfully"));
    }

    @GetMapping("/{commandId}")
    public CommandResponse getCommandById(@PathVariable Long commandId) {
        return commandService.getCommandById(commandId);
    }

    @GetMapping("/byUrl")
    public List<CommandResponse> getCommandsByUrl(@RequestParam(value = "url") String url) {
        return commandService.getCommandsByUrl(url);
    }

    @GetMapping("/byParams")
    public CommandResponse getCommandByParameters(@RequestParam(value = "url") String url, @RequestParam(value = "n") int n, @RequestParam(value = "c") int c) {
        return commandService.getCommandByParameters(url, n, c);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteRecurrent(@PathVariable Long id) {
        try {
            commandRepository.deleteById(id);
        } catch( Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
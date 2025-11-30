package com.desafio.checkin.controller;

import com.desafio.checkin.model.WorkRecord;
import com.desafio.checkin.service.WorkRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/work")
@CrossOrigin(origins = "*") // Libera pro React acessar
public class WorkRecordController {

    private final WorkRecordService workRecordService;

    public WorkRecordController(WorkRecordService workRecordService) {
        this.workRecordService = workRecordService;
    }

    @PostMapping("/checkin")
    public ResponseEntity<?> checkIn(@RequestParam Long employeeId) {
        try {
            WorkRecord record = workRecordService.checkIn(employeeId);
            return ResponseEntity.ok(record);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkOut(@RequestParam Long employeeId) {
        try {
            WorkRecord record = workRecordService.checkOut(employeeId);
            return ResponseEntity.ok(record);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/list/{employeeId}")
    public ResponseEntity<List<WorkRecord>> list(@PathVariable Long employeeId) {
        return ResponseEntity.ok(workRecordService.findAllByEmployee(employeeId));
    }
}
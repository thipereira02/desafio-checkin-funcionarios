package com.desafio.checkin.service;

import com.desafio.checkin.model.Employee;
import com.desafio.checkin.model.WorkRecord;
import com.desafio.checkin.repository.EmployeeRepository;
import com.desafio.checkin.repository.WorkRecordRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class WorkRecordService {

    private final WorkRecordRepository workRecordRepository;
    private final EmployeeRepository employeeRepository;

    public WorkRecordService(WorkRecordRepository workRecordRepository, EmployeeRepository employeeRepository) {
        this.workRecordRepository = workRecordRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<WorkRecord> findAllByEmployee(Long employeeId) {
        return workRecordRepository.findByEmployeeIdOrderByCheckinTimeDesc(employeeId);
    }

    public WorkRecord checkIn(Long employeeId) {
        if (employeeId == null) {
                throw new RuntimeException("Employee ID cannot be null");
        }

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (workRecordRepository.findByEmployeeIdAndCheckoutTimeIsNull(employeeId).isPresent()) {
            throw new RuntimeException("You already have an open check-in. Please check-out first.");
        }

        WorkRecord record = new WorkRecord();
        record.setEmployee(employee);
        record.setCheckinTime(LocalDateTime.now());
        
        return workRecordRepository.save(record);
    }

    public WorkRecord checkOut(Long employeeId) {
        WorkRecord record = workRecordRepository.findByEmployeeIdAndCheckoutTimeIsNull(employeeId)
                .orElseThrow(() -> new RuntimeException("No open check-in found for this employee."));

        record.setCheckoutTime(LocalDateTime.now());

        long minutes = Duration.between(record.getCheckinTime(), record.getCheckoutTime()).toMinutes();
        record.setDurationInMinutes(minutes);

        return workRecordRepository.save(record);
    }
}
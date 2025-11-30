package com.desafio.checkin.service;

import com.desafio.checkin.model.Employee;
import com.desafio.checkin.model.WorkRecord;
import com.desafio.checkin.repository.EmployeeRepository;
import com.desafio.checkin.repository.WorkRecordRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WorkRecordServiceTest {

    @Mock
    private WorkRecordRepository workRecordRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private WorkRecordService workRecordService;

    @Test
    void checkIn_ShouldThrowException_WhenCheckInIsDuplicate() {
        Long employeeId = 1L;
        
        when(employeeRepository.findById(employeeId)).thenReturn(Optional.of(new Employee()));

        when(workRecordRepository.findByEmployeeIdAndCheckoutTimeIsNull(employeeId))
            .thenReturn(Optional.of(new WorkRecord()));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            workRecordService.checkIn(employeeId);
        });

        assertEquals("You already have an open check-in. Please check-out first.", exception.getMessage());
    }

    @Test
    @SuppressWarnings("null")
    void checkOut_ShouldCalculateDurationCorrectly() {
        Long employeeId = 1L;
        
        WorkRecord openRecord = new WorkRecord();
        openRecord.setEmployee(new Employee());
        openRecord.setCheckinTime(LocalDateTime.now().minusMinutes(60));
        
        when(workRecordRepository.findByEmployeeIdAndCheckoutTimeIsNull(employeeId))
            .thenReturn(Optional.of(openRecord));

        when(workRecordRepository.save(any(WorkRecord.class))).thenAnswer(i -> i.getArguments()[0]);

        WorkRecord result = workRecordService.checkOut(employeeId);

        assertNotNull(result.getCheckoutTime());
        assertNotNull(result.getDurationInMinutes());
        assertEquals(60, result.getDurationInMinutes());
    }
}
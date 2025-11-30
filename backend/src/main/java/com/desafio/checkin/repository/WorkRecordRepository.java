package com.desafio.checkin.repository;

import com.desafio.checkin.model.WorkRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkRecordRepository extends JpaRepository<WorkRecord, Long> {
    
    Optional<WorkRecord> findByEmployeeIdAndCheckoutTimeIsNull(Long employeeId);

    List<WorkRecord> findByEmployeeIdOrderByCheckinTimeDesc(Long employeeId);
}
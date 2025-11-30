package com.desafio.checkin.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "work_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relacionamento: Um registro pertence a um funcionário
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private LocalDateTime checkinTime;

    private LocalDateTime checkoutTime;

    // Vamos salvar a duração em minutos (mais fácil de calcular)
    private Long durationInMinutes; 
}

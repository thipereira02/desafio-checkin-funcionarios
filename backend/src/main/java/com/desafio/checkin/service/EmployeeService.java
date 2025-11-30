package com.desafio.checkin.service;

import com.desafio.checkin.dto.LoginDTO;
import com.desafio.checkin.model.Employee;
import com.desafio.checkin.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee authenticate(LoginDTO loginDTO) {
        Employee employee = employeeRepository.findByEmail(loginDTO.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!employee.getPassword().equals(loginDTO.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return employee;
    }

    public Employee createEmployee(Employee employee) {
        if(employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return employeeRepository.save(employee);
    }
}
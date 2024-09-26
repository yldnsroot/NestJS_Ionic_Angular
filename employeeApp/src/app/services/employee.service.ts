// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employees'; // Adjust the API URL

  constructor(private http: HttpClient) {}

  // Get all employees with pagination (assumed response structure)
  getEmployees(page: number = 1, limit: number = 5): Observable<{ data: Employee[], total: number, totalPages: number }> {
    return this.http.get<{ data: Employee[], total: number, totalPages: number }>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  // Get employee by ID
  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Add a new employee
  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  // Method to register a new employee
  register(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, employee);
  }

  // Update an employee by ID
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }

  // Delete an employee by ID
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async findAll(paginationOptions: { page: number; limit: number }) {
    const { page, limit } = paginationOptions;
    
    const [result, total] = await this.employeesRepository.findAndCount({
      skip: (page - 1) * limit, // Calculate offset
      take: limit,              // Limit the number of results
    });

    return {
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeesRepository.findOne({ where: { id } });
  }

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const newEmployee = this.employeesRepository.create(employeeData);
    return this.employeesRepository.save(newEmployee);
  }

  async update(id: number, updateData: Partial<Employee>): Promise<Employee> {
    await this.employeesRepository.update(id, updateData);
    return this.employeesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.employeesRepository.delete(id);
  }
}

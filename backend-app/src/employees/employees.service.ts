import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Employee } from './employees.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Check if the email already exists and belongs to another employee
    if (updateEmployeeDto.email) {
      const emailInUse = await this.employeesRepository.findOne({
        where: { email: updateEmployeeDto.email, id: Not(id) }, // Check for other users with the same email
      });

      if (emailInUse) {
        throw new ConflictException('Email is already in use by another employee');
      }
    }

    // Convert DTO to plain object and exclude 'id' field if it's present
    const updateData = { ...updateEmployeeDto };

    // Remove 'id' field manually if it exists in the update data
    delete (updateData as any).id;

    // Perform the update with the filtered data (excluding id)
    await this.employeesRepository.update(id, updateData);

    // Return the updated employee
    return this.employeesRepository.findOne({ where: { id } });
  }

  //delete an employee
  async delete(id: number): Promise<void> {
    const employee = await this.employeesRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    await this.employeesRepository.delete(id);
  }
}

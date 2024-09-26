import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Employee } from '../employees/employees.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.employeeRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'], // Select necessary fields including the password
    });

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user; // Exclude the password before returning the user
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    // Find the user based on the provided login credentials
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new Error('Invalid credentials'); // Optionally throw a custom exception
    }

    // Create the JWT payload with id, email, and role from the found employee
    const payload = { id: user.id, email: user.email, role: user.role };
    
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<any> {
    // Check if the email is already in use
    const existingUser = await this.employeeRepository.findOne({ where: { email: registerDto.email } });
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(registerDto.password, 8);

    // Create the new employee
    const newUser = this.employeeRepository.create({
      ...registerDto,
      password: hashedPassword, // Replace plain password with the hashed password
    });

    // Save the new user to the database
    return this.employeeRepository.save(newUser);
  }
}

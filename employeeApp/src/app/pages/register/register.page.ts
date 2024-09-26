import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';  // Assuming you have a service for handling registration

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';
  position: string = '';
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  // Function to handle registration
  register() {
    if (!this.name || !this.email || !this.password || !this.position) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const newEmployee = {
      name: this.name,
      email: this.email,
      password: this.password,
      position: this.position, 
    };

    // Call the service to handle registration (you will implement this in your service)
    this.employeeService.register(newEmployee).subscribe(
      () => {
        this.router.navigate(['/tabs/login']);  // Redirect to login after successful registration
      },
      (error) => {
        this.errorMessage = 'Registration failed';
        console.error(error);
      }
    );
  }
}

// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      data => {
        this.router.navigate(['/tabs/employee-list']); // Redirect to employee list after login
      },
      error => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}

// src/app/pages/employee-details/employee-details.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // To return a fallback observable on error
import { AlertController } from '@ionic/angular'; // For displaying alerts in Ionic

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.page.html',
  styleUrls: ['./employee-details.page.scss'],
})
export class EmployeeDetailsPage implements OnInit {
  employee: any = { name: '', email: '', position: '' };
  isNew = true;
  id: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController // Inject alert controller for error handling
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isNew = false;
      this.loadEmployee(this.id);
    }
  }

  loadEmployee(id: string) {
    this.employeeService.getEmployee(+id)
      .pipe(
        catchError(async (error) => {
          await this.showAlert('Error', 'Failed to load employee details.');
          return of(null); // Return an empty observable to avoid breaking the flow
        })
      )
      .subscribe((response) => {
        if (response) {
          this.employee = response;
        }
      });
  }

  saveEmployee() {
    if (this.isNew) {
      this.employeeService.addEmployee(this.employee)
        .pipe(
          catchError(async (error) => {
            await this.showAlert('Error', 'Failed to add employee.');
            return of(null); // Return an empty observable to avoid breaking the flow
          })
        )
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['/tabs/employee-list']);
          }
        });
    } else {
      this.employeeService.updateEmployee(this.employee.id, this.employee)
        .pipe(
          catchError(async (error) => {
            await this.showAlert('Error', 'Failed to update employee.');
            return of(null); // Return an empty observable to avoid breaking the flow
          })
        )
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['/tabs/employee-list']);
          }
        });
    }
  }

  // Show alert using Ionic's AlertController
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}


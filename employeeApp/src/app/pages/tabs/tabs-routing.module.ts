import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../../guards/auth.guard'; // Import AuthGuard

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'employee-list',
        loadChildren: () => import('../employee-list/employee-list.module').then(m => m.EmployeeListPageModule),
        canActivate: [AuthGuard]  // Protect this route
      },
      {
        path: 'employee-details/:id',
        loadChildren: () => import('../employee-details/employee-details.module').then(m => m.EmployeeDetailsPageModule),
        canActivate: [AuthGuard]  // Protect this route
      },
      {
        path: 'register',  // Register page route
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule),
      },
      {
        path: '',
        redirectTo: 'login',  // Default to login if no tab is selected
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

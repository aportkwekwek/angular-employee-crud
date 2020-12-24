import { EditEmployeeComponent } from './../_views/dashboard/editemployee.component';
import { DashboardComponent } from './../_views/dashboard/dashboard.component';
import { LoginComponent } from './../_views/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/_services/auth.guard';
import { AddEmployeeComponent } from 'src/_views/dashboard/addemployee.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
    
  },
  {
    path: 'edit-employee',
    canActivate: [AuthGuard],
    component: EditEmployeeComponent
  },
  {
    path: 'add-employee',
    canActivate: [AuthGuard],
    component:AddEmployeeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

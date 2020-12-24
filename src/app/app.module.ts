import { HeaderComponent } from './../_views/dashboard/header.component';
import { JwtInterceptor } from './../_helpers/jwt.interceptor';
import { EditEmployeeComponent } from './../_views/dashboard/editemployee.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './../_views/dashboard/dashboard.component';
import { LoginComponent } from './../_views/login/login.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEmployeeComponent } from 'src/_views/dashboard/addemployee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EditEmployeeComponent,
    AddEmployeeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule
    
    
  ],
  providers: [
    JwtInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

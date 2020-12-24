import { TokenStorageService } from './../../_services/token-storage.service';
import { EmployeeService } from './../../_services/employee.service';
import { Employees } from './../../_models/employees';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'

})
export class LoginComponent {
    
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  

  constructor(
    private _formBuilder: FormBuilder,
    private route: Router,
    private _employeeService: EmployeeService,
    private _tokenStorageService: TokenStorageService,
    private toastr: ToastrService
  ) { 

    this.form = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    });

   }


  submitLogin() {
  
    let email = this.form.get("email")?.value;
    let password = this.form.get("password")?.value;
    
    var userCredentials = new Employees();
    userCredentials.email = email;
    userCredentials.password = password;

    this._employeeService.login(userCredentials).subscribe(
      data => {

        this._tokenStorageService.setToken(data.token);
        this._tokenStorageService.setUser(data.email);
        this._tokenStorageService.setAccessLevel(data.access_level_id);

        this.route.navigateByUrl('/dashboard');
        
      }, error => {

        this.toastr.warning("Email or password not found!");
        
      });

  }
}
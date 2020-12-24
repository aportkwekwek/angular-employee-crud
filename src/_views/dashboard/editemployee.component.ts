import { Employees } from './../../_models/employees';
import { EmployeeService } from './../../_services/employee.service';
import { TokenStorageService } from './../../_services/token-storage.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'editemployee.component.html'

})
export class EditEmployeeComponent implements OnInit {

  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });

  email!: any;
  employee! : Employees


  constructor(
    private _tokenStorageService: TokenStorageService,
    private _formBuilder: FormBuilder,
    private _employeeService : EmployeeService
  ) {
    this.form = _formBuilder.group({

      firstname: [''],
      lastname: ['']

    });
  }

      // email: ['', Validators.required],
      // age: ['', Validators.required],
      // birth_date: ['', Validators.required],

  ngOnInit() { 

    this.email = this._tokenStorageService.getEditEmployee();
    this.getEmployeeData();

  }


  getEmployeeData() { 
    

    var employeeData = new Employees();
    employeeData.email = this.email;

    this._employeeService.getCertainEmployee(employeeData).subscribe
      (data => {
        this.employee = data;

      }, error => {
          console.log(error);
      });

  }

  update() { 

    var editEmployee = new Employees();
    editEmployee.email = this.email; 
    editEmployee.firstname = this.form.get("firstname")?.value;
    editEmployee.lastname = this.form.get("lastname")?.value;

    this._employeeService.editEmployee(editEmployee).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
    });

  }

}
import { Employees } from './../../_models/employees';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from './../../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/_services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'addemployee.component.html'
})

export class AddEmployeeComponent implements OnInit { 

  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    age: new FormControl(''),
    job_title: new FormControl(''),
    access_level: new FormControl(''),
    birth_date: new FormControl('')
    
  });

  constructor(
    private _tokenStorageService: TokenStorageService,
    private _employeeService : EmployeeService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private toastr : ToastrService
  ) { 

    this.form = _formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      age: ['', Validators.required],
      job_title: ['', Validators.required],
      access_level: ['', Validators.required],
      birth_date: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this._tokenStorageService.getToken());
  }

  addEmployee() {
    
    let access_level_id = this.form.get("access_level")?.value;
    if (access_level_id == "Super User") { 
      access_level_id =1;
    } else {
      access_level_id = 2;
    }

    var newEmployee = new Employees();
    newEmployee.firstname = this.form.get("firstname")?.value;
    newEmployee.lastname = this.form.get("lastname")?.value;
    newEmployee.email = this.form.get("email")?.value;
    newEmployee.password = this.form.get("password")?.value;
    newEmployee.age = this.form.get("age")?.value;
    newEmployee.jobTitle = this.form.get("job_title")?.value;
    newEmployee.access_level_id = access_level_id;
    newEmployee.birth_date = this.form.get("birth_date")?.value;

    this._employeeService.addEmployee(newEmployee).subscribe(
      data => {
        if (data.message === "Success") {
        this.toastr.success("Employee Saved!", "System Message");
        this.router.navigateByUrl('/dashboard');
        } else {
          this.toastr.error(data.message,"System Message");
        }
        
      }, error => {
        this.toastr.error(error.message, "System Message");

      });
    
    


  }

}
import { Router } from '@angular/router';
import { TokenStorageService } from './../../_services/token-storage.service';
import { EmployeeService } from './../../_services/employee.service';

import { Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employees } from '../../_models/employees';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  providers: [NgbModal, NgbModalConfig]

})
export class DashboardComponent implements OnInit{


  employees!: Employees;
  selectedEmployee: any;
  nameOfUser!: any;


  constructor(
    private _employeeService: EmployeeService,
    private _tokenStorageService: TokenStorageService,
    private router: Router,
    private toastr: ToastrService,
    private ngbModalConfig: NgbModalConfig,
    private modalService : NgbModal
  
  ) {
    ngbModalConfig.backdrop = 'static';
    ngbModalConfig.keyboard = false;
    ngbModalConfig.animation = true;

  }
  
  ngOnInit() { 
    this.getUsers();
  }

  submitLogin() { 
  }

  getUsers() { 

    this._employeeService.getEmployees().subscribe(
      data => {
      this.employees = data;
  
    }, error => {
        console.log(error);
    });
  }


  editEmployee(empEdit: any) {
    
    
    if (this._tokenStorageService.getAccessLevel() == "2") {
      this.toastr.error("Access Denied!");
      return;
    }

    let editEmployee = empEdit.getAttribute('data-employee-id-edit');
    this._tokenStorageService.setEditUser(editEmployee);
    this.router.navigateByUrl('/edit-employee');
  }

  deleteEmployee(empDelete: any, content: any) { 

    if (this._tokenStorageService.getAccessLevel() == "2") {
      this.toastr.error("Access Denied!");
      return;
    }
  
    this.modalService.open(content);

    let deleteEmployee = empDelete.getAttribute('data-employee-id-delete');
    this._tokenStorageService.setUser(deleteEmployee);

    let employeeEmail = this._tokenStorageService.getUser();
    this.nameOfUser = employeeEmail;

  }

  confirmDelete() { 

    var employee = new Employees();
    employee.email = this.nameOfUser;

    this._employeeService.deleteEmployee(employee).subscribe(
      data => {
        this.toastr.info(data.message);
        this.getUsers();
        this.modalService.dismissAll();
      }, error => {
        this.toastr.warning(error.message);
      });
  }


  addEmployee() {
    this.router.navigateByUrl('/add-employee');
  }

  

}
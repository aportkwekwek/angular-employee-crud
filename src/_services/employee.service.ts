import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly CON_URL = "http://localhost:3000/api";

  constructor(private http : HttpClient){}

  getEmployees():Observable<any> {
    return this.http.post(this.CON_URL+'/getEmployees', httpOptions);
  }

  getCertainEmployee(employeeid:any): Observable<any> { 
    return this.http.post(this.CON_URL + '/getCertainEmployee', employeeid);
  }

  login(userCredentials: any): Observable<any>{
    return this.http.post(this.CON_URL + '/login', userCredentials);
  }

  addEmployee(employeeInformation: any): Observable<any>{
    return this.http.post(this.CON_URL + '/add-employee', employeeInformation);
  }

  deleteEmployee(employee: any): Observable<any> {
    return this.http.post(this.CON_URL + '/delete-employee', employee);
  }

  editEmployee(employee: any): Observable<any>{
    return this.http.patch(this.CON_URL + '/edit-employee', employee);
  }

}

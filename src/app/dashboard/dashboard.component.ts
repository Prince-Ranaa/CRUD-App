import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmpolyeeModel } from './empolyee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue!: FormGroup
  employeeModelObj: EmpolyeeModel = new EmpolyeeModel()
  showAdd!: boolean;
  showUpdate!: boolean;

  allEmpDetails: any

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: '',
      email: '',
      number: '',
      salary: '',
    })


    this.getAllEmployee()
  }

  addbtn() {
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }

  postEmpolyeeDetails() {

    this.employeeModelObj.name = this.formValue.value.name
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.number = this.formValue.value.number
    this.employeeModelObj.salary = this.formValue.value.salary

    this.api.postEmployee(this.formValue.value).subscribe({
      next: (res) => {
        alert("added successfully")
        this.formValue.reset()

      },
      error: () => {
        alert("error")
      }
    })

    this.getAllEmployee()
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe({
      next: (res) => {
        this.allEmpDetails = res
      }
    })
  }

  deleteEmployee(emp: any) {
    this.api.delete(emp.id).subscribe({
      next: () => {
        alert("employee Deleted")
        this.getAllEmployee()
      }
    })
  }


  updateEmployee(emp: any) {
    this.showAdd = false
    this.showUpdate = true
    this.employeeModelObj.id = emp.id
    this.formValue.controls['name'].setValue(emp.name)
    this.formValue.controls['email'].setValue(emp.email)
    this.formValue.controls['number'].setValue(emp.number)
    this.formValue.controls['salary'].setValue(emp.salary)
  }


  updateEmpolyeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.number = this.formValue.value.number
    this.employeeModelObj.salary = this.formValue.value.salary

    this.api.update(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert("update sucessful");
      this.formValue.reset()
      this.getAllEmployee()
    })
  }
}

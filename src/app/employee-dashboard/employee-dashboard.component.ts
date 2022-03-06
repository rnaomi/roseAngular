import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';

import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './Employee-dash board.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {
  page :number = 1;
   formValue !: FormGroup ;
   employeeModelobj:EmployeeModel = new EmployeeModel();
   showAdd!:boolean;
   showUpdate!:boolean;
   employeeData ! : any;
  constructor(private formbuilbar:FormBuilder, private api: ApiService) { }

  ngOnInit(): void 
  {
    this.formValue = this.formbuilbar.group({
      name : ['',[Validators. required ,Validators.minLength(5) , Validators.maxLength(10)]],
      email : ['' , [Validators.required,Validators.email]],
      gender : ['' ,Validators.required],
      status : ['' ,Validators.required],
    })
    this.getAllEmployee();
  
  }
  get f(){
    return this.formValue.controls;
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){

    this.employeeModelobj.name= this.formValue.value.name;
    this.employeeModelobj.email=this.formValue.value.email;
    this.employeeModelobj.gender= this.formValue.value.gender;
    this.employeeModelobj.status=this.formValue.value.status;
    console.log(this.employeeModelobj)

    this.api.postUser(this.employeeModelobj)
     .subscribe(res=>{
       console.log(res);
       alert("User Successfully added")
       let ref=document.getElementById('cancel')
       ref?.click
       this.formValue.reset();
       this.getAllEmployee();
       
     },
     err=>alert("Something wrong happened")
     )
    
    }
getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData=res;
    console.log(this.employeeData)
  })

}
deleteEmployee(row:any){
  

  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("User Deleted")
    this.getAllEmployee();
    console.log(res)
  })
}
onEdit(row:any){
  this.employeeModelobj.id= row.id;
  this.showAdd=false;
  this.showUpdate=true;
  this.formValue.controls['name'].setValue(row.name)
  this.formValue.controls['email'].setValue(row.email)
  this.formValue.controls['gender'].setValue(row.gender)
  this.formValue.controls['status'].setValue(row.status)
}
updateEmployeeDetails(){
  this.employeeModelobj.name= this.formValue.value.name;
  this.employeeModelobj.email=this.formValue.value.email;
  this.employeeModelobj.gender= this.formValue.value.gender;
  this.employeeModelobj.status=this.formValue.value.status;
  this.api.updateEmployee(this.employeeModelobj,this.employeeModelobj.id)
  .subscribe(res=>{
    alert("Updated Successfully");
    console.log(res);
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
  })
}
    
  

    
  }
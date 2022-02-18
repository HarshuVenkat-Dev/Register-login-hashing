import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm : FormGroup;
  

  constructor(private formbuilder:FormBuilder,private studentservice:StudentsService) { }

  ngOnInit(): void {
    this.init();
  }
  onSubmit(){
    const FormValue= this.regForm.value;
    if(FormValue.password == FormValue.confirm_password){
      this.studentservice.Register(this.regForm).subscribe(data=>alert(data));
    }
    else{
      alert("Password Mismatch");
    }
    // 
      // ;window.location.href = "http://localhost:4200/list"}
  }

  private init():void{
    this.regForm=this.formbuilder.group({
      emailId: [],
      password: [],
      confirm_password: []
    })
  }
}

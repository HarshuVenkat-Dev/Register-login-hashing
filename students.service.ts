import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Employee} from './employee';
import { from, Observable } from 'rxjs';
import { user } from './user';
import {hashSync, genSaltSync} from 'bcryptjs';
// const bcrypt = require('bcrypt');


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient){}
  employees:any;
  getStudents():Observable<Employee[]>{
  return this.http.get<Employee[]>("https://localhost:44397/Employee/Get");
  
  }

  public AddStudent(studata:any):Observable<any>{
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    //alert(studata);
  //  let header = new HttpHeaders()

  //   .append('Accept', '*/*')
    
  //   .append('Content-Type', 'application/json')
    
  //   .append('Access-Control-Allow-Origin', '*')
    
  //   .append('Set-Cookie', 'SameSite=None')
  //   .append('Access-Control-Allow-Headers', 'Content-Type')
  //   .append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    
     let formObj = studata.getRawValue(); 
  //   console.log(formObj)
  //   const body = JSON.stringify(formObj);
  //   console.log(body)
    
    

 // let header = new Headers().append('Content-Type', 'application/x-www-form-urlencoded'); 
//  var params = new URLSearchParams();
//         params.set('stu_id', '102');
//         params.set('stu_name', 'foo');
//         params.set('stu_age', 'foo');
  

//  return this._http.post('http://localhost:6579/api/PostUser', params.toString(), { headers: headers }).map(res => res.json());
    return this.http.post("https://localhost:44397/Employee/Post", formObj,{headers:headerDict});
    }

    deletePost(id):Observable<any>{
      return this.http.delete("https://localhost:44397/Employee/Delete/"+id); 
    }

    getStudentByid(id:any):Observable<Employee[]>{
      return this.http.get<Employee[]>("https://localhost:44397/Employee/GetByid/"+id);      
      }

    Update(stuEditeddata:any,id:any):any{
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
            
      let formObj1 = stuEditeddata.getRawValue(); 
      console.log(formObj1);
      return this.http.put("https://localhost:44397/Employee/Put/"+id,formObj1,{headers:headerDict});
      }


      Register(registerdata:any):Observable<any>{
        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
        let formObj2 = registerdata.getRawValue();
        const salt = genSaltSync(10);
        let hashpassword = hashSync(formObj2.password,salt);
        let regvalue ={ emailId : formObj2.emailId,password:hashpassword};
        console.log(formObj2);
        return this.http.post("https://localhost:44397/Employee/PostRegister", regvalue,{headers:headerDict});
      }

      getStudentByemail(loginForm:any):Observable<user[]>{
        let formObj3 = loginForm.getRawValue();
        console.log(loginForm.value.emailId);
        console.log(formObj3.emailId);
        return this.http.get<user[]>("https://localhost:44397/Employee/GetByemail/"+formObj3.emailId);              
        }
  
}

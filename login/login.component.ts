import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { StudentsService } from '../students.service';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import {compareSync} from 'bcryptjs';

// import * as jwt from 'jsonwebtoken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  users : any;

  constructor(
    private formbuilder:FormBuilder,private studentservice:StudentsService,
    private router: Router,
    private authService: SocialAuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.init();
  }
  onSubmit(){
    this.studentservice.getStudentByemail(this.loginForm).subscribe(data => {
      this.users = data;
      // console.log("Harshini",data , "hello");
      let passwordmatch= compareSync(this.loginForm.value.password ,this.users.password)
      if(passwordmatch){
        console.log(this.users.emailId);
        const conversionEncryptOutput = CryptoJS.AES.encrypt(this.users.emailId.trim(),this.users.password.trim()).toString();
        console.log("token",conversionEncryptOutput);
        const conversionDecryptOutput = CryptoJS.AES.decrypt(conversionEncryptOutput,this.users.password.trim()).toString(CryptoJS.enc.Utf8);
        console.log("de token",conversionDecryptOutput);
        sessionStorage.setItem('emailId',this.users.emailId);
        var expire = new Date();
        var time = Date.now() + 40000;
        expire.setTime(time);
        console.log(expire);
        this.cookieService.set('userToken', conversionEncryptOutput, expire);
        setTimeout(() => {
          this.cookieService.delete('userToken');
          alert("Session expired");
          console.log("session expired");
        }, 10000);
        alert("success!");
      //   const theToken = jwt.sign({id:this.users.emailId},'the-super-strong-secrect',{
      //     algorithm: 'RS256',
      //     expiresIn: 120,
      //     subject: this.users.emailId
      // });
      //   console.log(theToken);
        window.location.href = "http://localhost:4200/list";
      }
      else{
        alert("failed to login");
      }
    // this.users = data});
    // console.log(this.users);
    })
  }

  private init():void{
    this.loginForm=this.formbuilder.group({
      emailId: [],
      password: [],
    })
  }

  signInHandler(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) =>{
      localStorage.setItem('google_auth', JSON.stringify(data));
      console.log(data.email);
      sessionStorage.setItem('emailId',data.email);
      var expire = new Date();
        var time = Date.now() + 40000;
        expire.setTime(time);
      this.cookieService.set('userToken', data.authToken, expire);
      console.log(JSON.stringify(data));
      this.router.navigateByUrl('/list');
      alert("Hai Welcome to our page!!");
    })
  }

}



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'add-student',component:AddStudentComponent, canActivate: [AuthGuard] },
  {path:'login',component:LoginComponent },
  {path:'',component:LoginComponent },
  {path:'list',component:ListComponent, canActivate: [AuthGuard] },
  {path:'edit/:id',component:AddStudentComponent, canActivate: [AuthGuard] },
  {path:'register',component:RegisterComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }

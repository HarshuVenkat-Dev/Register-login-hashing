import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    LoginComponent,
    ListComponent,
    RegisterComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '605447381667-9ubfa39ondj4cc3526568mct1unqethk.apps.googleusercontent.com'
            )
          },
        ]
      } as SocialAuthServiceConfig,
    },
    AuthService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

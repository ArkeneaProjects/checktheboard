import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module'; 
import LoginComponent from './login/login.component';  
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../theme/shared/shared.module';
import { MaterialModule } from '../theme/shared/material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; 
import { NgOtpInputModule } from 'ng-otp-input';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent, 
    SignUpComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AuthRoutingModule,
    SharedModule, 
    FormsModule,
    NgOtpInputModule  
  
  ]
})
export class AuthModule { }

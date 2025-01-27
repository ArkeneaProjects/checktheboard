import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms'; 
import { ProfileRoutingModule } from './profile-routing.module'; 
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../../shared/material.module';
import { ChangeMobileNumberComponent } from './change-mobile-number/change-mobile-number.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ChangeEmailComponent } from './change-email/change-email.component';


@NgModule({
  declarations: [
    ProfileComponent, 
    ChangeMobileNumberComponent,
    ChangeEmailComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,  
    ɵInternalFormsSharedModule, 
    FormsModule,
    NgOtpInputModule
  ]
})
export class ProfileModule { }

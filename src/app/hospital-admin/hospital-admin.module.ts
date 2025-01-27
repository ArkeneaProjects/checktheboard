import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { MaterialModule } from '../theme/shared/material.module';
import { SharedModule } from '../theme/shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { HospitalAdminRoutingModule } from './hospital-admin-routing.module';


@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    HospitalAdminRoutingModule,
    MaterialModule,  
    SharedModule, 
    FormsModule
  ]
})
export class HospitalAdminModule { }

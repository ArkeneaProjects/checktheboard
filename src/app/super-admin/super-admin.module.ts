import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { ManageHospitalsComponent } from './manage-hospitals/manage-hospitals.component';
import { MaterialModule } from '../theme/shared/material.module';
import { SharedModule } from '../theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AddHospitalComponent } from './manage-hospitals/add-hospital/add-hospital.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalRequestsComponent } from './hospital-requests/hospital-requests.component';
import { SalesRepsComponent } from './sales-reps/sales-reps.component';


@NgModule({
  declarations: [
    ManageHospitalsComponent,
    AddHospitalComponent,
    DashboardComponent,
    HospitalRequestsComponent,
    SalesRepsComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    MaterialModule,  
    SharedModule, 
    FormsModule
  ]
})
export class SuperAdminModule { }

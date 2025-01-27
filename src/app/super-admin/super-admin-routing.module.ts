import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageHospitalsComponent } from './manage-hospitals/manage-hospitals.component';
import { AddHospitalComponent } from './manage-hospitals/add-hospital/add-hospital.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalRequestsComponent } from './hospital-requests/hospital-requests.component';
import { SalesRepsComponent } from './sales-reps/sales-reps.component';

const routes: Routes = [
    {
      path: 'manage-hospitals',
      component: ManageHospitalsComponent, 
    },
    {
      path: 'manage-hospitals/add-hospital',
      component: AddHospitalComponent, 
    },
    {
      path: 'dashboard',
      component: DashboardComponent, 
    },
    {
      path: 'hospital-requests',
      component: HospitalRequestsComponent, 
    },
    {
      path: 'sales-reps',
      component: SalesRepsComponent, 
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

const routes: Routes = [
    // {
    //   path: 'manage-hospitals',
    //   component: ManageHospitalsComponent, 
    // }, 
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalAdminRoutingModule { }

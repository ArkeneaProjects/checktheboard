// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
import { IconModule } from '@ant-design/icons-angular';
 
import { MaterialModule } from './material.module';
import { SharedRoutingModule } from './shared-routing.module';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component'; 

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedRoutingModule,
    ReactiveFormsModule,  
    NgScrollbarModule, 
    IconModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
  ],
  declarations: [
    AdminLayoutComponent,  
  ]
})
export class SharedModule {}

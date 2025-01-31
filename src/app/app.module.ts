// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IMaskModule } from 'angular-imask';


// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { AuthLayoutComponent } from './theme/layouts/auth-layout/auth-layout.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent, 
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    SharedModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    IMaskModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

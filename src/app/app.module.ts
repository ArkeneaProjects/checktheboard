// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

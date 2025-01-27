// angular import
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 
})
export default class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onOtpChange(otp: string) { console.log('OTP changed:', otp); }
}

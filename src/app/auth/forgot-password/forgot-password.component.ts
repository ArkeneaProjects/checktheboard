import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../core/utils/messages'
import { AuthService } from '../../core/services/auth.service'
import { CommonService } from '../../core/services/common.service'
import { StepperOrientation,MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password', 
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  @ViewChild('stepper') stepper: MatStepper;
  stepperOrientation: Observable<StepperOrientation>;
  validationMessages = validationMessages;
  private _formBuilder = inject(FormBuilder);
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  otpValue = ''
  hide = signal(true);
  isResendButtonShow = false
  constructor(private authService: AuthService,
    private commonService: CommonService){

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  goToNext(stepForm){
    if (stepForm==1 && !this.firstFormGroup.invalid){
      let reqVars = {
        query: { email: this.firstFormGroup.controls['email'].value },
        fields: { }
      }
      this.authService.apiRequest('post', 'users/forgotPassword', reqVars).subscribe(async response => {
        if(response.status=='error'){
          this.commonService.toastMessage(response?.data)
        }else{
          this.stepper.next();
          setTimeout(() => {
            this.isResendButtonShow = true;
          }, 30000); // 30 seconds delay
        }
      })
    }

    if(stepForm==2){
      let reqVars = {
        query: { email: this.firstFormGroup.controls['email'].value, forgotPasswordOtp:this.otpValue },
        fields: { }
      }
      this.authService.apiRequest('post', 'users/verifyOtp', reqVars).subscribe(async response => {
        if(response.status=='error'){
          this.commonService.toastMessage(response?.data)
        }else{
          this.stepper.next();
        }
      })
    }

    if (stepForm==1 && this.firstFormGroup.invalid){
      this.firstFormGroup.markAllAsTouched();
      return;
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  } 

  resendOtp(){
    let reqVars = {
      query: { email: this.firstFormGroup.controls['email'].value },
      fields: { }
    }
    this.authService.apiRequest('post', 'users/resendOtp', reqVars).subscribe(async response => {
      if(response.status=='error'){
        this.commonService.toastMessage(response?.data)
      }else{
        this.isResendButtonShow = false;
        this.commonService.toastMessage(response?.data.message)
        setTimeout(() => {
          this.isResendButtonShow = true;
        }, 30000); // 30 seconds delay
      }
    })
  }

  onOtpChange(otp: string) { 
    if(otp.length==6){
      this.otpValue = otp
    }
  }
}

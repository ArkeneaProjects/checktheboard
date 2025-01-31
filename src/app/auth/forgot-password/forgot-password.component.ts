import { Component, inject, signal, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../core/utils/messages'
import { AuthService } from '../../core/services/auth.service'
import { CommonService } from '../../core/services/common.service'
import { StepperOrientation,MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    private commonService: CommonService,public router: Router){

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.secondFormGroup = this._formBuilder.group({
      newPassword: ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&#^()+=_<>,./;:'"|\`~])[A-Za-z\d-@$!%*?&#^()+=_<>,./;:'"|\`~]{8,16}$/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword:any = control.get('newPassword');
    const confirmPassword:any = control.get('confirmPassword');
    if (confirmPassword.value && newPassword.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
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
          this.commonService.toastMessage(response?.data.message)
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
          this.commonService.toastMessage(response?.data.message)
          this.stepper.next();
        }
      })
    }

    if (stepForm==3 && !this.secondFormGroup.invalid){
      let reqVars = {
        query: { email: this.firstFormGroup.controls['email'].value },
        fields: {newPassword: this.secondFormGroup.controls['newPassword'].value }
      }
      this.authService.apiRequest('post', 'users/updateNewPassword', reqVars).subscribe(async response => {
        if(response.status=='error'){
          this.commonService.toastMessage(response?.data)
        }else{
          this.commonService.toastMessage(response?.data.message)
          this.router.navigate(['/login/']);
        }
      })
    }

    if (stepForm==1 && this.firstFormGroup.invalid){
      this.firstFormGroup.markAllAsTouched();
      return;
    }

    if (stepForm==3 && this.secondFormGroup.invalid){
      this.secondFormGroup.markAllAsTouched();
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

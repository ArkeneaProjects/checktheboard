// angular import
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { validationMessages } from '../../core/utils/messages'
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'
import { CommonService } from '../../core/services/common.service'

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 
})
export default class LoginComponent {
  validationMessages = validationMessages;
  rememberMeObj: any = { email: '', password: '', rememberMe: false };
  userType: string = '';
  public loginForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    let rememberMeData: any = localStorage.getItem('rememberMe');
    if (rememberMeData != null) { this.rememberMeObj = JSON.parse(rememberMeData) }
  }
  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: [this.rememberMeObj.email, [Validators.required, Validators.email]],
      password: [this.rememberMeObj.password, Validators.required],
      rememberMe: [this.rememberMeObj.rememberMe],
    });
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    if (this.loginForm.valid) {
      let reqVars = {
        email: this.loginForm.controls['email'].value, 
        hash: this.loginForm.controls['password'].value 
      }
  
      this.authService.apiRequest('post', 'users/login', reqVars).subscribe(async response => {
        if(response.status=='success'){
          this.setLocalStorage(response, this.loginForm.value)
          this.router.navigate(['/super-admin/dashboard/']);
        } else {
          this.commonService.toastMessage(response?.data)
        }
      })
    }
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
  }

  setLocalStorage(res: any, loginValues: any) {
    localStorage.setItem('user', JSON.stringify(res.data));
    if (this.loginForm.controls['rememberMe'].value) {
      localStorage.setItem('rememberMe', JSON.stringify(loginValues));
    } else {
      localStorage.removeItem('rememberMe');
    }
  }

}

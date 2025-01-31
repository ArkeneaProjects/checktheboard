import { Component, inject, signal, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'rxjs';
import { AlertModalComponent } from 'src/app/theme/common/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { validationMessages } from '../../../core/utils/messages'
import { regex } from '../../../core/utils/regexConstants'
import { AuthService } from '../../../core/services/auth.service'
import { CommonService } from '../../../core/services/common.service'

@Component({
  selector: 'app-add-hospital', 
  templateUrl: './add-hospital.component.html',
  styleUrl: './add-hospital.component.scss'
})
export class AddHospitalComponent implements OnInit {
  toggleText: string = 'Deactive';
  validationMessages = validationMessages;
  formData: any
  adminUserId: string = '';
  hospitalDeatils: any
  userDetails: any
  isEdit: boolean = false
  isCompleteSignup = ''

  addHospitalForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[A-z ]+$/)])),
    addressOne: new FormControl('', Validators.compose([Validators.required])),
    addressTwo: new FormControl(''),
    city: new FormControl('', Validators.compose([Validators.required])),
    state: new FormControl('', Validators.compose([Validators.required])),
    zipcode: new FormControl('', Validators.compose([Validators.required])),
    hphone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(14)])),
    hemail: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])),
    firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[A-z ]+$/)])),
    lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[A-z ]+$/)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(14)])),
  })

  constructor(
      private fb: FormBuilder,
      public router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private commonService: CommonService,
    ) {    }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.adminUserId = params['id']
    })
    if(this.adminUserId != undefined){
      this.getHospitalDetails()
      this.isEdit = true
    }

  }

  onToggleChange(event: any) 
  { 
    this.toggleText = event.checked ? 'Active' : 'Deactive';     
  }

  readonly dialog = inject(MatDialog);

  //for form validations
  get form() {
    return this.addHospitalForm.controls;
  }

  // Get hospital admin and hospital details
  async getHospitalDetails() {
    let params = {
      query: { userId: this.adminUserId },
    }

    this.authService.apiRequest('post', 'hospital/getHospitalDetails', params).subscribe(async response => {
      if(response.status=='success'){
        console.log("Hospital", response)
        this.userDetails = response.data.userDetails
        this.hospitalDeatils = response.data.hospital
        this.isCompleteSignup = this.userDetails.signupStatus
        await this.setFormValues()
      } else {
        this.commonService.toastMessage(response?.data)
      }
    })
  }
  
  async setFormValues() {
    this.addHospitalForm.controls['name'].setValue(this.hospitalDeatils?.name)
    this.addHospitalForm.controls['addressOne'].setValue(this.hospitalDeatils?.addressOne)
    this.addHospitalForm.controls['addressTwo'].setValue(this.hospitalDeatils?.addressTwo)
    this.addHospitalForm.controls['city'].setValue(this.hospitalDeatils?.city)
    this.addHospitalForm.controls['state'].setValue(this.hospitalDeatils?.state)
    this.addHospitalForm.controls['zipcode'].setValue(this.hospitalDeatils?.zipcode)
    this.addHospitalForm.controls['hphone'].setValue(this.hospitalDeatils?.phone)
    this.addHospitalForm.controls['hemail'].setValue(this.hospitalDeatils?.email)
    this.addHospitalForm.controls['firstName'].setValue(this.userDetails?.firstName)
    this.addHospitalForm.controls['lastName'].setValue(this.userDetails?.lastName)
    this.addHospitalForm.controls['phone'].setValue(this.userDetails?.phone)
    this.addHospitalForm.controls['email'].setValue(this.userDetails?.email)
  }

  // method check if  email is already in use
  checkUserEmails() {
    let params = {
      query: { email: this.addHospitalForm.controls['email'].value.toLowerCase() },
      fields: { email: 1 }
    }
    this.authService.apiRequest('post', 'users/getUser', params).subscribe(async res => {
      if (res.status == "success") {
        this.addHospitalForm.controls["email"].setErrors({ isEmailExist: true });
      }
      else {
        this.addHospitalForm.controls["email"].setErrors(null);
      }
    }, (err) => {
    }
    )
  }

  alertModal(){
    this.formData = this.addHospitalForm.value
    const dialogRef = this.dialog.open(AlertModalComponent, { 
      panelClass: 'custom-alert-container',
      autoFocus: false,
      data: {
        headerText: 'Confirmation',
        warningNote: 'Are you sure to onboard the Hospital and the Hospital Admin? An invitation link will be sent to the registered email address of the Hospital Admin.',
        pinkBtnText: 'Yes',
        blueBtnText: 'No',
        yesBtnMessage: 'An invitation link sent successfully to the registered email address of the Hospital Admin.',
        noBtnMessage: 'No' 
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(this.adminUserId){
          this.updateHospitalAdmin(this.formData)
        } else { 
          this.addHospitalAdmin(this.formData)
        }
      } else {
        console.log('cancelled');
      }
    });
  }

  // Create hospital admin user
  addHospitalAdmin(param: any) {
      let reqVars = {
        firstName: param.firstName,
        lastName: param.lastName,
        email: param.email, 
        phone: param.phone,
        userType: 'hospitalAdmin'
      }
      this.authService.apiRequest('post', 'users/createUser', reqVars).subscribe(async response => {
        if(response.status=='success'){
          this.addHospital(response.data.userDetails._id, this.formData)
        } else {
          this.commonService.toastMessage(response?.data)
        }
      })
  }

  // Update hospital admin user
  updateHospitalAdmin(param: any) {
    let reqVars = {
      firstName: param.firstName,
      lastName: param.lastName,
      email: param.email, 
      phone: param.phone,
      userType: 'hospitalAdmin'
    }
    let params = {
      query: {
        _id: this.adminUserId
      },
      updateBody: reqVars,
    }
    this.authService.apiRequest('post', 'users/updateUserDetails', params).subscribe(async response => {
      if(response.status=='success'){
        this.updateHospital(this.adminUserId, this.formData)
      } else {
        this.commonService.toastMessage(response?.data)
      }
    })
  }

  // Create hospital 
  addHospital(userId: any, hospitalData: any) {
    let reqVars = {
      userId: userId,
      name: hospitalData.name,
      addressOne: hospitalData.addressOne,
      addressTwo: hospitalData.addressTwo,
      city: hospitalData.city,
      state: hospitalData.state,
      zipcode: hospitalData.zipcode,
      phone: hospitalData.hphone,
      email: hospitalData.hemail,
    }

    this.authService.apiRequest('post', 'hospital/creatHospital', reqVars).subscribe(async response => {
      if(response.status=='success'){
        this.router.navigate(['/super-admin/manage-hospitals/']);
      } else {
        this.commonService.toastMessage(response?.data)
      }
    })
  
  }

  // Update hospital details 
  updateHospital(userId: any, hospitalData: any) {
    let reqVars = {
      name: hospitalData.name,
      addressOne: hospitalData.addressOne,
      addressTwo: hospitalData.addressTwo,
      city: hospitalData.city,
      state: hospitalData.state,
      zipcode: hospitalData.zipcode,
      phone: hospitalData.hphone,
      email: hospitalData.hemail,
    }
    let params = {
      query: {
        userId: this.adminUserId
      },
      updateBody: reqVars,
    }

    this.authService.apiRequest('post', 'hospital/updateHospitalDetails', params).subscribe(async response => {
      if(response.status=='success'){
        this.router.navigate(['/super-admin/manage-hospitals/']);
      } else {
        this.commonService.toastMessage(response?.data)
      }
    })
  
  }

  // Resend invite to hospital admin
  resendInviteHospitalAdmin() {
    let reqVars = {
      _id: this.adminUserId
    }
    this.authService.apiRequest('post', 'users/resendInvitation', reqVars).subscribe(async response => {
      if(response.status=='success'){
        //this.addHospital(response.data.userDetails._id, this.formData)
      } else {
        this.commonService.toastMessage(response?.data)
      }
    })
  }

  // Cancel invitation 
  cancelInviteHospitalAdmin() {
    let reqVars = {
      signupStatus: 'Disable'
    }
    let params = {
      query: {
        userId: this.adminUserId
      },
      updateBody: reqVars,
    }

    this.authService.apiRequest('post', 'users/updateUserDetails', params).subscribe(async response => {
      if(response.status=='success'){
        this.router.navigate(['/super-admin/manage-hospitals/']);
      } else {
        this.commonService.toastMessage(response?.data)
      }
    })
  
  }

  
  
   // Capitalize first letter of a string
   firstCapitalize(e: any) {
    var textBox: HTMLInputElement = <HTMLInputElement>e.target;
    textBox.value = textBox.value.replace(regex.pattern.FIRST_LETTER_CAPITALIZE, (m, $1, $2) => $1 + $2.toUpperCase());
  }
  
}

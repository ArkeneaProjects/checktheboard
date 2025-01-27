import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { merge } from 'rxjs';
import { AlertModalComponent } from 'src/app/theme/common/alert-modal/alert-modal.component';

@Component({
  selector: 'app-add-hospital', 
  templateUrl: './add-hospital.component.html',
  styleUrl: './add-hospital.component.scss'
})
export class AddHospitalComponent {
  toggleText: string = 'Deactive';
  onToggleChange(event: any) 
  { 
    this.toggleText = event.checked ? 'Active' : 'Deactive';     
  }

  readonly hname = new FormControl('', [Validators.required]);
  readonly adOne = new FormControl('', [Validators.required]);
  readonly adTwo = new FormControl('', [Validators.required]);
  readonly city = new FormControl('', [Validators.required]);
  readonly state = new FormControl('', [Validators.required]);
  readonly zipcode = new FormControl('', [Validators.required]);
  readonly contactNumber = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required]); 
  readonly fname = new FormControl('', [Validators.required]);
  readonly lname = new FormControl('', [Validators.required]);
  readonly haemail = new FormControl('', [Validators.required]); 
  readonly mnumber = new FormControl('', [Validators.required]); 

  readonly dialog = inject(MatDialog);

  alertModal(){
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
  }
  
}

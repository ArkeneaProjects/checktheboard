import { Component, inject, signal } from '@angular/core'; 
import { PositiveAlertComponent } from '../../positive-alert/positive-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-change-email', 
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.scss'
})
export class ChangeEmailComponent {
  otpSection = false;
  readonly dialog = inject(MatDialog); 

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  } 
  onOtpChange(otp: string) {  } 

  submit() {
        const dialogRef = this.dialog.open(PositiveAlertComponent, {
          panelClass: 'custom-alert-container',
          autoFocus: false,
          data: {
            positiveNote: 'Email has been changed successfully.'
          }
        });
  }

  changeEmail() {
    this.otpSection = true;
  }
}

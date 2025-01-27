import { Component, inject, signal } from '@angular/core'; 
import { PositiveAlertComponent } from '../../positive-alert/positive-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-change-mobile-number', 
  templateUrl: './change-mobile-number.component.html',
  styleUrl: './change-mobile-number.component.scss'
})
export class ChangeMobileNumberComponent {
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
            positiveNote: 'Mobile number has been changed successfully.'
          }
        });
  }
  changeMobile() {
    this.otpSection = true;
  }
}

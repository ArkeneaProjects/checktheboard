import { Component, inject, signal } from '@angular/core';
import { ChangeMobileNumberComponent } from './change-mobile-number/change-mobile-number.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PositiveAlertComponent } from '../positive-alert/positive-alert.component';
import { ChangeEmailComponent } from './change-email/change-email.component';

@Component({
  selector: 'app-profile', 
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  username = true;
  userimage = false;

  readonly dialog = inject(MatDialog); 

  changeMobileNumber(){
    const dialogRef = this.dialog.open(ChangeMobileNumberComponent, {
      panelClass: 'custom-alert-container', 
      autoFocus: false
    }); 
  }

  changeEmail(){
    const dialogRef = this.dialog.open(ChangeEmailComponent, {
      panelClass: 'custom-alert-container', 
      autoFocus: false
    });
  }

  submit() {
    const dialogRef = this.dialog.open(PositiveAlertComponent, {
      panelClass: 'custom-alert-container',
      autoFocus: false,
      data: {
        positiveNote: 'Password has been changed successfully..'
      }
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  } 

  changeUserImage() {
    this.username = false;
    this.userimage = true;
  }
}

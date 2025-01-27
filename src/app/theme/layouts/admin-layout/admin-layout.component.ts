// Angular import
import { ChangeDetectorRef, Component, inject } from '@angular/core'; 

// Project import 
import { MediaMatcher } from '@angular/cdk/layout'; 
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from '../../common/alert-modal/alert-modal.component';

@Component({
  selector: 'app-admin-layout', 
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  readonly dialog = inject(MatDialog);
  mobileQuery: MediaQueryList;  

  private _mobileQueryListener: () => void;

  constructor() { 
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    const dialogRef = this.dialog.open(AlertModalComponent, { 
      panelClass: 'custom-alert-container',
      autoFocus: false,
      data: {
        headerText: 'Confirmation',
        warningNote: 'Are you sure to sign out?',
        pinkBtnText: 'Yes',
        blueBtnText: 'No',
        yesBtnMessage: 'Sign out successfully!',
        noBtnMessage: 'Sign out cancelled!' 
      }
    });
  }
}

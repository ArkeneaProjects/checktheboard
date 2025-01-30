// Angular import
import { ChangeDetectorRef, Component, inject } from '@angular/core'; 

// Project import 
import { MediaMatcher } from '@angular/cdk/layout'; 
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from '../../common/alert-modal/alert-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout', 
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  readonly dialog = inject(MatDialog);
  mobileQuery: MediaQueryList;  

  private _mobileQueryListener: () => void;
  userName = ''
  userDetails:any
  userType = ''
  constructor(public router: Router) { 
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 

    let user: any = localStorage.getItem('user');
    this.userDetails = JSON.parse(user).userDetails
    this.userName = this.userDetails.firstName +' '+ this.userDetails.lastName
    if(this.userDetails.userType=='systemAdmin'){
      this.userType = 'System Admin'
    }else if(this.userDetails.userType=='salesRep') {
      this.userType = ' Sales Rep'
    }else if(this.userDetails.userType=='hospitalAdmin') {
      this.userType = ' Hospital Admin'
    }
    
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
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/login/']);
        localStorage.removeItem('user')
      }
    })
  }
}

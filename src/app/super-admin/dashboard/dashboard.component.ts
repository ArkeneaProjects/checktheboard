import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userDetails:any
  userName = ''
  hospitalCounts = 0
  salesRepCounts = 0
  constructor(private authService: AuthService,public router: Router) {
      let user: any = localStorage.getItem('user');
      this.userDetails = JSON.parse(user).userDetails
      this.userName = this.userDetails.firstName +' '+ this.userDetails.lastName

      this.authService.apiRequest('post', 'users/getDashboardData', {}).subscribe(async response => {
        this.hospitalCounts = response.data.results.hospitalCount
        this.salesRepCounts = response.data.results.salesRepCount
      })
  }

  gotoPage(type){
    if(type=='hospital'){
      this.router.navigate(['/super-admin/manage-hospitals/']);
    }else{
      this.router.navigate(['/super-admin/sales-reps/']);
    }
    
  }

}

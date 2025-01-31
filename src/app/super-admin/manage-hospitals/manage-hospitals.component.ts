import { Component, inject, ViewChild, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertModalComponent } from 'src/app/theme/common/alert-modal/alert-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'
import { CommonService } from '../../core/services/common.service'

@Component({
  selector: 'app-manage-hospitals', 
  templateUrl: './manage-hospitals.component.html',
  styleUrl: './manage-hospitals.component.scss'
})
export class ManageHospitalsComponent implements OnInit { 

  whereCond: any = { userType: "hospitalAdmin" }
  hospitalList: any 

  displayedColumns: string[] = 
  ['hospital', 'cityandState', 'hospitalContactNo', 'hospitalAdmin', 'emailAddress','status','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
        public router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private commonService: CommonService,
      ) {    }
  ngOnInit(): void {
    this.getAllHospitals()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 
  announceSortChange(sortState: Sort) {}

  readonly dialog = inject(MatDialog);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  alertModal(){
    const dialogRef = this.dialog.open(AlertModalComponent, {
      panelClass: 'custom-alert-container',
      autoFocus: false,
      data: {
        headerText: 'Confirmation',
        warningNote: 'Are you sure to activate this Hospital?',
        pinkBtnText: 'Yes',
        blueBtnText: 'No',
        yesBtnMessage: 'Hospital has been active successfully.',
        noBtnMessage: 'Hospital has been deactivate successfully.'
      }
    });
  }

  // Get all hospital list 
  async getAllHospitals() {
    
    let params = {
      //query: this.whereCond
    }

    this.authService.apiRequest('post', 'hospital/getAllHopitals', params).subscribe(async response => {
      if(response.status=='success'){
        
        this.hospitalList = response.data.hospitals
        console.log(this.hospitalList)
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.hospitalList)
      } else {
        this.commonService.toastMessage(response?.data)
      }
    })
  
  }

}
export interface PeriodicElement {
  hospital: string;
  cityandState: string;
  hospitalContactNo: string;
  hospitalAdmin: string;
  emailAddress: string;
  status : string;
  actions: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    hospital: 'Jone ABC Hospital', 
    cityandState: 'India', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'John Doe',
    emailAddress: 'johnabc@gmail.com',
    status: 'Active',
    actions: ''
  }, 
  {
    hospital: 'Emily Blunt', 
    cityandState: 'Japan', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Priya, Ponnappa',
    emailAddress: 'priya@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Timothy Farris', 
    cityandState: ' Tokyo', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Stanbrige, Peter',
    emailAddress: 'stanbrige@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Charles Williams', 
    cityandState: ' Delhi', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Lee-Walsh, Natalie',
    emailAddress: 'natalie@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Ithya, Nguta', 
    cityandState: 'USA', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Anderson, Eugenia',
    emailAddress: 'anderson@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Jone ABC Hospital', 
    cityandState: 'India', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'John Doe',
    emailAddress: 'johnabc@gmail.com',
    status: 'Active',
    actions: ''
  }, 
  {
    hospital: 'Emily Blunt', 
    cityandState: 'Japan', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Priya, Ponnappa',
    emailAddress: 'priya@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Timothy Farris', 
    cityandState: ' Tokyo', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Stanbrige, Peter',
    emailAddress: 'stanbrige@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Charles Williams', 
    cityandState: ' Delhi', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Lee-Walsh, Natalie',
    emailAddress: 'natalie@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Ithya, Nguta', 
    cityandState: 'USA', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Anderson, Eugenia',
    emailAddress: 'anderson@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Jone ABC Hospital', 
    cityandState: 'India', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'John Doe',
    emailAddress: 'johnabc@gmail.com',
    status: 'Active',
    actions: ''
  }, 
  {
    hospital: 'Emily Blunt', 
    cityandState: 'Japan', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Priya, Ponnappa',
    emailAddress: 'priya@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Timothy Farris', 
    cityandState: ' Tokyo', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Stanbrige, Peter',
    emailAddress: 'stanbrige@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Charles Williams', 
    cityandState: ' Delhi', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Lee-Walsh, Natalie',
    emailAddress: 'natalie@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Ithya, Nguta', 
    cityandState: 'USA', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Anderson, Eugenia',
    emailAddress: 'anderson@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Jone ABC Hospital', 
    cityandState: 'India', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'John Doe',
    emailAddress: 'johnabc@gmail.com',
    status: 'Active',
    actions: ''
  }, 
  {
    hospital: 'Emily Blunt', 
    cityandState: 'Japan', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Priya, Ponnappa',
    emailAddress: 'priya@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Timothy Farris', 
    cityandState: ' Tokyo', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Stanbrige, Peter',
    emailAddress: 'stanbrige@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Charles Williams', 
    cityandState: ' Delhi', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Lee-Walsh, Natalie',
    emailAddress: 'natalie@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Ithya, Nguta', 
    cityandState: 'USA', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Anderson, Eugenia',
    emailAddress: 'anderson@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Jone ABC Hospital', 
    cityandState: 'India', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'John Doe',
    emailAddress: 'johnabc@gmail.com',
    status: 'Active',
    actions: ''
  }, 
  {
    hospital: 'Emily Blunt', 
    cityandState: 'Japan', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Priya, Ponnappa',
    emailAddress: 'priya@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Timothy Farris', 
    cityandState: ' Tokyo', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Stanbrige, Peter',
    emailAddress: 'stanbrige@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Charles Williams', 
    cityandState: ' Delhi', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Lee-Walsh, Natalie',
    emailAddress: 'natalie@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Ithya, Nguta', 
    cityandState: 'USA', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Anderson, Eugenia',
    emailAddress: 'anderson@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Jone ABC Hospital', 
    cityandState: 'India', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'John Doe',
    emailAddress: 'johnabc@gmail.com',
    status: 'Active',
    actions: ''
  }, 
  {
    hospital: 'Emily Blunt', 
    cityandState: 'Japan', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Priya, Ponnappa',
    emailAddress: 'priya@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Timothy Farris', 
    cityandState: ' Tokyo', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Stanbrige, Peter',
    emailAddress: 'stanbrige@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Charles Williams', 
    cityandState: ' Delhi', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Lee-Walsh, Natalie',
    emailAddress: 'natalie@gmail.com',
    status: 'Deactive',
    actions: ''
  },
  {
    hospital: 'Ithya, Nguta', 
    cityandState: 'USA', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'Anderson, Eugenia',
    emailAddress: 'anderson@gmail.com',
    status: 'Active',
    actions: ''
  },
  {
    hospital: 'Jone ABC Hospital', 
    cityandState: 'India', 
    hospitalContactNo: '+1 555 861 4506', 
    hospitalAdmin: 'John Doe',
    emailAddress: 'johnabc@gmail.com',
    status: 'Active',
    actions: ''
  }, 

  
   
];
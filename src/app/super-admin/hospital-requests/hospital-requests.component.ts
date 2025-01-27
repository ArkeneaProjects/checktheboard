import { Component, inject, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertModalComponent } from 'src/app/theme/common/alert-modal/alert-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-hospital-requests', 
  templateUrl: './hospital-requests.component.html',
  styleUrl: './hospital-requests.component.scss'
})
export class HospitalRequestsComponent { 
  displayedColumns: string[] = 
  ['date', 'salesRepresentative', 'hospitalName', 'location', 'hospitalContactNo','contactPerson','status','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
        warningNote: 'Are you sure to accept the request?',
        pinkBtnText: 'Yes',
        blueBtnText: 'No',
        yesBtnMessage: 'Request has been accepted successfully.',
        noBtnMessage: 'Request has been rejected successfully.'
      }
    });
  }
  cancelAlert(){
    const dialogRef = this.dialog.open(AlertModalComponent, {
      panelClass: 'custom-alert-container',
      autoFocus: false,
      data: {
        headerText: 'Confirmation',
        warningNote: 'Are you sure to reject the request?',
        pinkBtnText: 'Yes',
        blueBtnText: 'No',
        yesBtnMessage: 'Request has been rejected successfully',
        noBtnMessage: 'Request has been rejected successfully.'
      }
    });
  }
}

export interface PeriodicElement {
  date: string;
  salesRepresentative: string;
  hospitalName: string;
  location: string;
  hospitalContactNo: string;
  contactPerson: string;
  status : string;
  actions: string
}

const ELEMENT_DATA: PeriodicElement[] = [  
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: 'false'
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: 'true'
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: 'false'
  },
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: 'false'
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: 'true'
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: 'false'
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: 'false'
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: 'true'
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: ''
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: ''
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: ''
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: ''
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: ''
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: ''
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: ''
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: ''
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: ''
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: ''
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: ''
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: ''
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: ''
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: ''
  },
 
  {
    date: '12/03/2024', 
    salesRepresentative: 'Jone Smith', 
    hospitalName: 'Boston Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'James White',
    status: 'accepted',
    actions: ''
  }, 
  {
    date: '15/09/2024', 
    salesRepresentative: 'Emily Blunt', 
    hospitalName: 'Boston Specialty Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'Emily Blunt',
    status: 'pending',
    actions: ''
  }, 
  {
    date: '12/02/2024', 
    salesRepresentative: 'James White', 
    hospitalName: 'Franco-USAese Hospital', 
    location: ' New York, USA',
    hospitalContactNo: '+1 555 861 4506',
    contactPerson:'William Watson',
    status: 'rejected',
    actions: ''
  },
 
 
   
];
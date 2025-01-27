import { Component, inject, ViewChild } from '@angular/core'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertModalComponent } from 'src/app/theme/common/alert-modal/alert-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sales-reps', 
  templateUrl: './sales-reps.component.html',
  styleUrl: './sales-reps.component.scss'
})
export class SalesRepsComponent {
  displayedColumns: string[] = 
  ['firstName', 'lastName', 'companyName', 'dateofJoining', 'subscriptionStatus','lastRenewalDate', ];
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
 
}

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  companyName: string;
  dateofJoining: string;
  subscriptionStatus: string;
  lastRenewalDate: string; 
}

const ELEMENT_DATA: PeriodicElement[] = [  
  {
    firstName: 'Jone', 
    lastName: 'Smith', 
    companyName: 'UnitedHealth Group ', 
    dateofJoining: '09/20/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'12/03/2024', 
  }, 
  {
    firstName: 'Emily', 
    lastName: 'Blunt', 
    companyName: 'Medicalforge ', 
    dateofJoining: '09/01/2024',
    subscriptionStatus: 'expired',
    lastRenewalDate:'11/15/2024', 
  }, 
  {
    firstName: 'Timothy', 
    lastName: 'Farris', 
    companyName: 'Reliant Health ', 
    dateofJoining: '08/16/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'10/28/2024', 
  }, 
  {
    firstName: 'Christopher', 
    lastName: 'Rains', 
    companyName: 'ABC UnitedHealth', 
    dateofJoining: '07/21/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'07/21/2024', 
  },
  {
    firstName: 'David', 
    lastName: 'Gillman', 
    companyName: 'CBD Jone PVT. ', 
    dateofJoining: '06/03/2023',
    subscriptionStatus: 'expired',
    lastRenewalDate:'06/03/2023', 
  },
  {
    firstName: 'Jone', 
    lastName: 'Smith', 
    companyName: 'UnitedHealth Group ', 
    dateofJoining: '09/20/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'12/03/2024', 
  }, 
  {
    firstName: 'Emily', 
    lastName: 'Blunt', 
    companyName: 'Medicalforge ', 
    dateofJoining: '09/01/2024',
    subscriptionStatus: 'expired',
    lastRenewalDate:'11/15/2024', 
  }, 
  {
    firstName: 'Timothy', 
    lastName: 'Farris', 
    companyName: 'Reliant Health ', 
    dateofJoining: '08/16/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'10/28/2024', 
  }, 
  {
    firstName: 'Christopher', 
    lastName: 'Rains', 
    companyName: 'ABC UnitedHealth', 
    dateofJoining: '07/21/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'07/21/2024', 
  },
  {
    firstName: 'David', 
    lastName: 'Gillman', 
    companyName: 'CBD Jone PVT. ', 
    dateofJoining: '06/03/2023',
    subscriptionStatus: 'expired',
    lastRenewalDate:'06/03/2023', 
  },
  {
    firstName: 'Jone', 
    lastName: 'Smith', 
    companyName: 'UnitedHealth Group ', 
    dateofJoining: '09/20/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'12/03/2024', 
  }, 
  {
    firstName: 'Emily', 
    lastName: 'Blunt', 
    companyName: 'Medicalforge ', 
    dateofJoining: '09/01/2024',
    subscriptionStatus: 'expired',
    lastRenewalDate:'11/15/2024', 
  }, 
  {
    firstName: 'Timothy', 
    lastName: 'Farris', 
    companyName: 'Reliant Health ', 
    dateofJoining: '08/16/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'10/28/2024', 
  }, 
  {
    firstName: 'Christopher', 
    lastName: 'Rains', 
    companyName: 'ABC UnitedHealth', 
    dateofJoining: '07/21/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'07/21/2024', 
  },
  {
    firstName: 'David', 
    lastName: 'Gillman', 
    companyName: 'CBD Jone PVT. ', 
    dateofJoining: '06/03/2023',
    subscriptionStatus: 'expired',
    lastRenewalDate:'06/03/2023', 
  },
  {
    firstName: 'Jone', 
    lastName: 'Smith', 
    companyName: 'UnitedHealth Group ', 
    dateofJoining: '09/20/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'12/03/2024', 
  }, 
  {
    firstName: 'Emily', 
    lastName: 'Blunt', 
    companyName: 'Medicalforge ', 
    dateofJoining: '09/01/2024',
    subscriptionStatus: 'expired',
    lastRenewalDate:'11/15/2024', 
  }, 
  {
    firstName: 'Timothy', 
    lastName: 'Farris', 
    companyName: 'Reliant Health ', 
    dateofJoining: '08/16/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'10/28/2024', 
  }, 
  {
    firstName: 'Christopher', 
    lastName: 'Rains', 
    companyName: 'ABC UnitedHealth', 
    dateofJoining: '07/21/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'07/21/2024', 
  },
  {
    firstName: 'David', 
    lastName: 'Gillman', 
    companyName: 'CBD Jone PVT. ', 
    dateofJoining: '06/03/2023',
    subscriptionStatus: 'expired',
    lastRenewalDate:'06/03/2023', 
  },
  {
    firstName: 'Jone', 
    lastName: 'Smith', 
    companyName: 'UnitedHealth Group ', 
    dateofJoining: '09/20/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'12/03/2024', 
  }, 
  {
    firstName: 'Emily', 
    lastName: 'Blunt', 
    companyName: 'Medicalforge ', 
    dateofJoining: '09/01/2024',
    subscriptionStatus: 'expired',
    lastRenewalDate:'11/15/2024', 
  }, 
  {
    firstName: 'Timothy', 
    lastName: 'Farris', 
    companyName: 'Reliant Health ', 
    dateofJoining: '08/16/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'10/28/2024', 
  }, 
  {
    firstName: 'Christopher', 
    lastName: 'Rains', 
    companyName: 'ABC UnitedHealth', 
    dateofJoining: '07/21/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'07/21/2024', 
  },
  {
    firstName: 'David', 
    lastName: 'Gillman', 
    companyName: 'CBD Jone PVT. ', 
    dateofJoining: '06/03/2023',
    subscriptionStatus: 'expired',
    lastRenewalDate:'06/03/2023', 
  },
  {
    firstName: 'Jone', 
    lastName: 'Smith', 
    companyName: 'UnitedHealth Group ', 
    dateofJoining: '09/20/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'12/03/2024', 
  }, 
  {
    firstName: 'Emily', 
    lastName: 'Blunt', 
    companyName: 'Medicalforge ', 
    dateofJoining: '09/01/2024',
    subscriptionStatus: 'expired',
    lastRenewalDate:'11/15/2024', 
  }, 
  {
    firstName: 'Timothy', 
    lastName: 'Farris', 
    companyName: 'Reliant Health ', 
    dateofJoining: '08/16/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'10/28/2024', 
  }, 
  {
    firstName: 'Christopher', 
    lastName: 'Rains', 
    companyName: 'ABC UnitedHealth', 
    dateofJoining: '07/21/2024',
    subscriptionStatus: 'active',
    lastRenewalDate:'07/21/2024', 
  },
  {
    firstName: 'David', 
    lastName: 'Gillman', 
    companyName: 'CBD Jone PVT. ', 
    dateofJoining: '06/03/2023',
    subscriptionStatus: 'expired',
    lastRenewalDate:'06/03/2023', 
  },
 
 
   
];
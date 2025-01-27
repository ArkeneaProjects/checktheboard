import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-positive-alert',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './positive-alert.component.html',
  styleUrl: './positive-alert.component.scss'
})
export class PositiveAlertComponent {
 positiveNote=''

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    this.positiveNote = data.positiveNote != undefined ? data.positiveNote : this.positiveNote;      
  }
}

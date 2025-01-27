import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-negative-alert',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './negative-alert.component.html',
  styleUrl: './negative-alert.component.scss'
})
export class NegativeAlertComponent {
  negativeNote=''

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    this.negativeNote = data.negativeNote != undefined ? data.negativeNote : this.negativeNote;      
  }
}

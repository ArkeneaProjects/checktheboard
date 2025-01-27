import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private snack: MatSnackBar, public dialog: MatDialog) {
  }

  //function to display toast message on screen.
  public toastMessage(message: string) {
    this.snack.open(message, 'OK', { duration: 5000 })
  }

  public formatDate(date: Date) {
    if (date && date != undefined) {
      const d = new Date(date)
      const month = "Jan,Feb,Mar,Apr,May,June,July,Aug,Sept,Oct,Nov,Dec".split(",")[d.getMonth()]
      return month + " " + d.getDate() + ", " + d.getFullYear()
    } else {
      return 'NA'
    }
  }

  public capitalize = function (str: any) {
    if (str && str != "") {
      var firstLetter = str.substr(0, 1)
      return firstLetter.toUpperCase() + str.substr(1);
    } else {
      return ""
    }
  } 

}
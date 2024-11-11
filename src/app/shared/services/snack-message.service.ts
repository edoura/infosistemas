import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackMessageService {
  errorCurrency!: string;
  noSchedulingObtained!: string;
  reversalRegistered!: string;
  registered!: string;
  updated!: string;
  deleted!: string;
  selectedItem!: string;
  unauthorized!: string;
  err!: string;
  actClose!: string;

  constructor(
    @Inject(MatSnackBar) private readonly snackBar: MatSnackBar,
  ) { }

  alert(msg: string) {
    this.snackBar.open(msg, 'fechar', {
      duration: 3000,
      panelClass: ['mat-primary'],
    });
  }

  error(msg: string) {
    this.snackBar.open(msg, 'fechar', {
      duration: 3000,
      panelClass: ['mat-warn'],
    });
  }

}

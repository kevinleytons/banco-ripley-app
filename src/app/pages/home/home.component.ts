import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NuevoDestinatarioDialogComponent } from 'src/app/shared/dialogs/nuevo-destinatario-dialog/nuevo-destinatario-dialog.component';

import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public _apiService: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openDialogNewAddressee() {
    const dialogRef = this.dialog.open(NuevoDestinatarioDialogComponent);

    dialogRef.afterClosed().subscribe( destinatarioForm => {
      if( destinatarioForm.valid ) {
        this._apiService.registrarDestinatario( destinatarioForm.value ).subscribe( (destinatario: any) => {
          if ( destinatario ) {
            this._snackBar.open("Destinatario Registrado Correctamente", 'Aceptar');
          }
        });
      }
    });
  }

}

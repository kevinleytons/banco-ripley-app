import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NuevoDestinatarioDialogComponent } from 'src/app/shared/dialogs/nuevo-destinatario-dialog/nuevo-destinatario-dialog.component';

import { Addressee } from 'src/app/shared/models/addressee';
import { Transferencia } from 'src/app/shared/models/transferencia';

import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.sass']
})
export class TransferirComponent implements OnInit {

  isLoading = false;

  addressee = new FormControl( null, [ Validators.required ] );
  amount = new FormControl( null, [ Validators.required ] );

  selectedAddresse: any | undefined;

  addressees: Addressee[] = [];
  filteredOptions: Observable<Addressee[]> | undefined;

  constructor(
    public _currency: CurrencyPipe,
    public dialog: MatDialog,
    public _apiService: ApiService,
    public _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this._apiService.obtenerDestinatarios().subscribe( destinatarios => {
      this.addressees = destinatarios;
      this.isLoading = false;
    });

    this.filteredOptions = this.addressee.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(name => name ? this._filter(name) : this.addressees.slice())
      );
  }


  openDialogNewAddressee() {
    const dialogRef = this.dialog.open(NuevoDestinatarioDialogComponent);

    dialogRef.afterClosed().subscribe( destinatarioForm => {
      if( destinatarioForm.valid ) {
        this._apiService.registrarDestinatario( destinatarioForm.value ).subscribe( (destinatario: any) => {
          this.addressees.push(destinatario)
          this._snackBar.open("Destinatario Registrado Correctamente", 'Aceptar');
          this.selectedAddresse = null;
        });
      }
    });
  }

  isDataValid() {
    return this.addressee.value != null && this.amount.value != null;
  }

  transformToCLP() {
    let numberValue = this.amount.value.replace(/\D/g,'');
    if ( numberValue != 0 ) {
      let newValue = this._currency.transform( numberValue, 'CLP', 'symbol-narrow' );
      this.amount.patchValue( newValue );
    } else {
      this.amount.patchValue( null );
    }
  }

  displayFn(bank: Addressee): string {
    return bank && bank.nombre ? bank.nombre : '';
  }

  private _filter(name: string): Addressee[] {
    const filterValue = name.toLowerCase();
    return this.addressees.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  generarTransferencia() {
    let data: Transferencia = {
      id: 0,
      monto: this.amount.value,
      fecha: new Date(),
      destinatario_id: this.addressee.value.id,
      Destinatario: null
    };
    this._apiService.generarTransferencia( data ).subscribe( (transferencia: any) => {
        this._snackBar.open("Transferencia Registrada Correctamente", 'Aceptar');
        this.addressee.patchValue(null);
        this.amount.patchValue(null);
    });
  }

}

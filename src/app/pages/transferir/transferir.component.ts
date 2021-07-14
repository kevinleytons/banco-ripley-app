import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NuevoDestinatarioDialogComponent } from 'src/app/shared/dialogs/nuevo-destinatario-dialog/nuevo-destinatario-dialog.component';

import { Addressee } from 'src/app/shared/models/addressee';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.sass']
})
export class TransferirComponent implements OnInit {

  addressee = new FormControl();
  amount = new FormControl();

  addressees: Addressee[] = [
    {
      name: 'Pedrito',
      rut: '123',
      email: 'a@a.cl',
      phone: 123,
      bank: { id: '312', name: 'bank' },
      accountType: '123',
      accountNumber: 123
    },
    {
      name: 'Juanito',
      rut: '1234',
      email: 'b@b.cl',
      phone: 123,
      bank: { id: '312', name: 'Ripley' },
      accountType: '123',
      accountNumber: 123
    }
  ];
  filteredOptions: Observable<Addressee[]> | undefined;

  constructor(
    public _currency: CurrencyPipe,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.filteredOptions = this.addressee.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.addressees.slice())
      );
  }


  openDialogNewAddressee() {
    const dialogRef = this.dialog.open(NuevoDestinatarioDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isDataValid() {
    return this.addressee.value != null && this.amount.value != null;
  }


  transformToCLP() {
    let newValue = this._currency.transform( this.amount.value.replace(/\D/g,''), 'CLP', 'symbol-narrow' );
    this.amount.patchValue( newValue );
  }

  displayFn(bank: Addressee): string {
    return bank && bank.name ? bank.name : '';
  }

  private _filter(name: string): Addressee[] {
    const filterValue = name.toLowerCase();
    return this.addressees.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}

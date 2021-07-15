import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Bank } from '../../models/bank';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-nuevo-destinatario-dialog',
  templateUrl: './nuevo-destinatario-dialog.component.html',
  styleUrls: ['./nuevo-destinatario-dialog.component.sass']
})
export class NuevoDestinatarioDialogComponent implements OnInit {

  public nuevoDestinatarioForm!: FormGroup;

  public banks!: Bank[];
  public filteredBanks: Observable<Bank[]> | undefined;

  public tiposCuenta: string[] = [
    'Cuenta Corriente',
    'Cuenta Vista'
  ];

  constructor(
    public fb: FormBuilder,
    public _apiService: ApiService
  ) {}

  ngOnInit(): void {
    this._apiService.obtenerListadoBancos().subscribe( (bancos: Bank[]) => {
      this.banks = bancos;
      this.filteredBanks = this.nuevoDestinatarioForm.get('banco')!.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.banks.slice())
        );
    });

    this.nuevoDestinatarioForm = this.fb.group({
      rut: [ null, [ Validators.required ] ],
      nombre: [ null, [ Validators.required ] ],
      correo: [ null, [ Validators.required, Validators.email ] ],
      telefono: [ null, [ Validators.required ] ],
      banco: [ null, [ Validators.required ] ],
      tipoCuenta: [ null, [ Validators.required ] ],
      numeroCuenta: [ null, [ Validators.required ] ]
    })
  }

  displayFn(bank: Bank): string {
    return bank && bank.name ? bank.name : '';
  }

  private _filter(name: string): Bank[] {
    const filterValue = name.toLowerCase();
    return this.banks.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}

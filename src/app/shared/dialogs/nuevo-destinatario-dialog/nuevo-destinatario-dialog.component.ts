import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nuevo-destinatario-dialog',
  templateUrl: './nuevo-destinatario-dialog.component.html',
  styleUrls: ['./nuevo-destinatario-dialog.component.sass']
})
export class NuevoDestinatarioDialogComponent implements OnInit {

  public nuevoDestinatarioForm!: FormGroup;

  constructor(
    public fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.nuevoDestinatarioForm = this.fb.group({
      rut: [ null ],
      nombre: [ null ],
      correo: [ null ],
      telefono: [ null  ],
      banco: [ null ],
      tipoCuenta: [ null ],
      numeroCuenta: [ null ]
    })
  }

}

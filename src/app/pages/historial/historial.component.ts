import { Component, OnInit } from '@angular/core';
import { Transferencia } from 'src/app/shared/models/transferencia';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.sass']
})
export class HistorialComponent implements OnInit {

  isLoading: boolean = false;

  displayedColumns: string[] = ['nombre', 'rut', 'banco', 'tipoCuenta'/* , 'numeroCuenta' */, 'monto', 'fecha'];
  dataSource!: any[];

  constructor(
    public _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._apiService.obtenerHistorial().subscribe( (historial: Transferencia[]) => {
      this.dataSource = historial.map((t) => {
        return {
          nombre: t.Destinatario!.nombre,
          rut: t.Destinatario!.rut,
          banco: t.Destinatario!.banco,
          tipoCuenta: t.Destinatario!.tipo_cuenta,
          numeroCuenta: t.Destinatario!.numero_cuenta,
          monto: t.monto,
          fecha: t.fecha
        }
      });
      this.isLoading = false;
    });

  }

}

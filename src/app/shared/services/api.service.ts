import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment'
import { Transferencia } from '../models/transferencia';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) { }

  public generarTransferencia( transferencia: Transferencia ) {
    let url = `${environment.URL_API}/transferencia`;
    return this.http.post( url, transferencia ).pipe(
      map( (resp: any) => {
        return resp.transferencia;
      })
    )
  }

  public registrarDestinatario( formValue: FormGroup ) {
    let url = `${environment.URL_API}/destinatario`;
    return this.http.post( url, formValue ).pipe(
      map( (resp: any) => {
        return resp.destinatario;
      })
    )
  }

  public obtenerListadoBancos() {
    let url = `${environment.URL_API}/bancos`;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.banks;
      })
    )
  }

  public obtenerDestinatarios() {
    let url = `${environment.URL_API}/destinatario`;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.destinatarios;
      })
    )
  }

  public obtenerHistorial() {
    let url = `${environment.URL_API}/historial`;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.transferencias;
      })
    )
  }

}

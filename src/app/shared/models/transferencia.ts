import { Addressee } from '../models/addressee';

export interface Transferencia {
  id: number;
  monto: number;
  fecha: Date;
  destinatario_id: number;
  Destinatario: Addressee | null;
}
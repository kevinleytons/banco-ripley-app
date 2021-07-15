import { Bank } from 'src/app/shared/models/bank';

export interface Addressee {
  nombre: string;
  rut: string;
  correo: string;
  telefono: number;
  banco: Bank;
  tipo_cuenta: string;
  numero_cuenta: number;
}

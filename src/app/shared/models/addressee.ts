import { Bank } from 'src/app/shared/models/bank';

export interface Addressee {
  name: string;
  rut: string;
  email: string;
  phone: number;
  bank: Bank;
  accountType: string;
  accountNumber: number;
}

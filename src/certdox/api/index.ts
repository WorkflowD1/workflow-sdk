import { Voucher } from './Voucher/';
import { Register } from './Register/';

export class Certdox {
  public voucher: Voucher;
  public register: Register;

  constructor(apiKey: string) {
    this.voucher = new Voucher(apiKey);
    this.register = new Register(apiKey);
  }
}

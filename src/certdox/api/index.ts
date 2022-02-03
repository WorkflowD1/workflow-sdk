import { Voucher } from './Voucher/';
import { Register } from './Register/';
import { Requirements } from './Requirements';

export class Certdox {
  public voucher: Voucher;
  public register: Register;
  public requirements: Requirements;

  constructor(apiKey: string) {
    this.voucher = new Voucher(apiKey);
    this.register = new Register(apiKey);
    this.requirements = new Requirements(apiKey);
  }
}

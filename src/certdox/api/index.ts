import { Voucher } from './Voucher/'
import { Register } from './Register/'
import { CertdoxCredentialsObject } from './Credentials/'

export * from './Credentials/'

export class Certdox {
    public voucher: Voucher
    public register: Register

    constructor(credentials: CertdoxCredentialsObject) {
        this.voucher = new Voucher(credentials)
        this.register = new Register(credentials)
    }
}
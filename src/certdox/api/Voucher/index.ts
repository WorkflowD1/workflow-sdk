import { CertdoxCredentialsObject } from '../Credentials';
import { CertdoxRequest } from '../../utils';

export interface CreateVoucherRequestProperties {
  tipoCombo: string
  idDocumento: string
  nome: string
  cpfCnpj: string
  cidade: string
  uf: string
  nomeMae: string
  nomePai: string
  rg: string
  dataNascimento: string
  informacoesAdicionais: string
}

export class Voucher extends CertdoxRequest {
  
  constructor(credentialsObject: CertdoxCredentialsObject) {
    super(credentialsObject)
  }
  
  public async ask(document: Array<CreateVoucherRequestProperties>, credentialsKey?: string) {
    const { status, data } = await this.requestVoucher(document)
    return {
      status,
      data
    }
  }
}
import { CertdoxRequest } from '../../utils';

export interface CreateVoucherRequestProperties {
  tipoCombo: string;
  idDocumento: string;
  nome: string;
  cpfCnpj: string;
  cidade: string;
  uf: string;
  nomeMae: string;
  nomePai: string;
  rg: string;
  dataNascimento: string;
  informacoesAdicionais: string;
}

export class Voucher extends CertdoxRequest {
  constructor(apiKey: string) {
    super(apiKey);
  }

  public async ask(document: Array<CreateVoucherRequestProperties>) {
    const { status, data } = await this.requestVoucher(document);
    return {
      status,
      data,
    };
  }
}

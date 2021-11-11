import { CertdoxRequest } from '../../utils';

export interface CreateRegisterRequestProperties {
  tipoCombo: string;
  idDocumento: string;
  cartorio: string;
  uf: string;
  numeroContrato: string;
  partes: any;
  documentos: any;
  informacoesAdicionais: string;
}

export class Register extends CertdoxRequest {
  constructor(apiKey: string) {
    super(apiKey);
  }

  public async ask(document: CreateRegisterRequestProperties) {
    const { status, data } = await this.requestRegister(document);
    return {
      status,
      data,
    };
  }
}

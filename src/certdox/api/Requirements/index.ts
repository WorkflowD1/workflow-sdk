import { CertdoxRequest } from '../../utils';

export interface CreateRequirementsRequestProperties {
  idPedido: string,
  idSmarkio: string,
  textoSolucao: string
}

export class Requirements extends CertdoxRequest {
  constructor(apiKey: string) {
    super(apiKey);
  }

  public async ask(document: CreateRequirementsRequestProperties) {
    const { status, data } = await this.requestRequirements(document);
    return {
      status,
      data,
    };
  }
}

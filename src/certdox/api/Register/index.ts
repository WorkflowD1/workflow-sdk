import { CertdoxCredentialsObject } from '../Credentials';
import { CertdoxRequest } from '../../utils';

export interface CreateRegisterRequestProperties {
    tipoCombo: string
    idDocumento: string
    cartorio: string
    uf: string
    numeroContrato: string
    partes: any
    documentos: any
    informacoesAdicionais: string
  }

export class Register extends CertdoxRequest {
  
  constructor(credentialsObject: CertdoxCredentialsObject) {
    super(credentialsObject)
  }

  public async ask(document: CreateRegisterRequestProperties, credentialsKey?: string) {
    const { status, data } = await this.requestRegister(document)
    return {
      status,
      data
    }
  }
}
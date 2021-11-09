import request, { AxiosPromise } from 'axios'

import { CertdoxCredentials, CertdoxCredentialsObject } from '../../api';

export interface Token {
  token: string
}
export abstract class CertdoxRequest {

    protected currentCredentials!: CertdoxCredentials
    protected readonly credentialsObject: CertdoxCredentialsObject
    
    private baseUrl = 'https://gw-homolog.cdxti.com.br/smarkio/v1'

    constructor(credentialsObject: CertdoxCredentialsObject) {
        this.credentialsObject = credentialsObject
        this.currentCredentials = credentialsObject.default
        this.baseUrl = this.baseUrl
    }


  protected requestVoucher(data: any) {
    return this.request('/certidao', data)
  }

  protected requestRegister(data: any) {
    return this.request('/registro', data)
  }

  private async request(url: string, data: any) {
    const token = await this.currentCredentials.getToken()
    return request({
      baseURL: this.baseUrl,
      url,
      method: 'POST',
      headers: {
        apikey: token
      },
      data
    })
  }
}
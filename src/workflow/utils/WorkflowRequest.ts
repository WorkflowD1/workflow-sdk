import request, { AxiosPromise } from 'axios'

import { Credentials, CredentialsConfig, CredentialsObject } from '../api';

export interface Token {
  token: string,
  expiration: number
}
export abstract class WorkflowRequest {

  protected baseURL: string
  protected currentCredentials!: Credentials
  protected readonly credentialsObject: CredentialsObject

  constructor(baseURL: string, credentialsObject: CredentialsObject) {
    this.baseURL = baseURL
    this.credentialsObject = credentialsObject
    this.currentCredentials = credentialsObject.default
  }

  public static signIn({ email, password, baseURL }: CredentialsConfig): AxiosPromise<Token> {
    return request({
      baseURL,
      url: '/cognito/user/signIn',
      method: 'POST',
      data: {
        email,
        password
      }
    })
  }

  public documentCreate(data: any) {
    return this.request('/document/create', data)
  }

  public documentUpdate(data: any) {
    return this.request('/document/updateById', data)
  }

  public documentLoad(data: any) {
    return this.request('/document/filter', data)
  }

  public documentLoadById(data: any) {
    return this.request('/document/loadById', data)
  }

  public attachmentUploadFile(data: any) {
    return this.request('/attachment/upload/link', data)
  }

  public attachmentUpdateById(data: any) {
    return this.request('/attachment/updateById', data)
  }

  public attachmentCreatePendency(data: any) {
    return this.request('/attachment/createPendency', data)
  }

  public attachmentLoadPendency(data: any) {
    return this.request('/attachment/loadPendency', data)
  }

  private async request(url: string, data: any) {
    const token = await this.currentCredentials.getToken()
    return request({
      baseURL: this.baseURL,
      url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    })
  }
}
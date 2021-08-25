import request, { AxiosPromise } from 'axios'

import { Credentials, CredentialsConfig, CredentialsObject } from '../../api';

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

  protected documentCreate(data: any) {
    return this.request('/document/create', data)
  }

  protected documentUpdate(data: any) {
    return this.request('/document/updateById', data)
  }

  protected documentLoad(data: any) {
    return this.request('/document/filter', data)
  }

  protected documentLoadById(data: any) {
    return this.request('/document/loadById', data)
  }

  protected attachmentUploadFile(data: any) {
    return this.request('/attachment/upload/link', data)
  }

  protected attachmentUpdateById(data: any) {
    return this.request('/attachment/updateById', data)
  }

  protected attachmentCreatePendency(data: any) {
    return this.request('/attachment/createPendency', data)
  }

  protected attachmentLoadPendency(data: any) {
    return this.request('/attachment/loadPendency', data)
  }

  protected observationCreate(data: any) {
    return this.request('/observation/create', data)
  }

  protected observationDeleteById(data: any) {
    return this.request('/observation/deleteById', data)
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
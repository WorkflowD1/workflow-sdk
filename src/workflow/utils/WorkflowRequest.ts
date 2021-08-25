import request, { AxiosPromise } from 'axios'

import { CredentialsConfig } from '..';
import { Credentials } from '../api';

export interface Token {
  token: string,
  expiration: number
}

export class WorkflowRequest {

  private baseURL: string
  private credentials: Credentials

  constructor(baseURL: string, credentials: Credentials) {
    this.baseURL = baseURL
    this.credentials = credentials
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
    const token = await this.credentials.getToken()
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
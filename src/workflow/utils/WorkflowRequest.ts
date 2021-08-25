import request, { AxiosPromise } from 'axios'

import { CredentialsConfig } from '..';

export interface Token {
  token: string,
  expiration: number
}

export class WorkflowRequest {

  public static baseURL: string

  public static signIn({ email, password, baseURL }: CredentialsConfig): AxiosPromise<Token> {
    
    WorkflowRequest.baseURL = baseURL

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

  public static documentCreate(data: any, token: string) {
    return request({
      baseURL: WorkflowRequest.baseURL,
      url: '/document/create',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    })
  }

  public static documentUpdate(data: any,  token: string) {
    return request({
      baseURL: WorkflowRequest.baseURL,
      url: '/document/updateById',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    })
  }

  public static documentLoad(data: any,  token: string) {
    return request({
      baseURL: WorkflowRequest.baseURL,
      url: '/document/filter',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    })
  }
}
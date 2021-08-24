import request, { AxiosPromise } from 'axios'

import { CredentialsConfig } from '..';

export interface Token {
    token: string,
    expiration: number
}

export function signIn({email, password, baseURL}: CredentialsConfig): AxiosPromise<Token> {
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
import request from 'axios'

import { CredentialsConfig } from '..';

export function signIn({email, password, baseURL}: CredentialsConfig) {
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
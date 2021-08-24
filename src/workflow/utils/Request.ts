import request from 'axios'

import { CredentialsConfig } from '..';

export function signIn({username, password, url}: CredentialsConfig) {
    return request({
        url,
        data: {
            username,
            password
        }
    })
}
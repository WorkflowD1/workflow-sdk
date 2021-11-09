import request from 'axios'
import { CredentialsOptions } from "../../../common/GenericCredentials";
import { GenericCredentials } from "../../../common/GenericCredentials";

export interface CertdoxJWT {
    login: string
    password: string
}

export interface CertdoxCredentialsObject {
    default: CertdoxCredentials
}

export class CertdoxCredentials extends GenericCredentials<CertdoxJWT> {
    constructor(auth: CertdoxJWT, options?: CredentialsOptions) {
        super(auth, options)
    }

    public async getToken(): Promise<string> {
        // if (this.redis && await this.isTokenValid()) {
        //     return this.redis.retrieveToken()
        // }
        // Verificar a regra de negócio de autenticação
        // ENDPOINT AUTENTICAÇÃO: https://sandbox-saas.docket.com.br/api/v2/auth/login
        // const { data: { token, expiration } } = await request({ url: '', method: 'POST', data: {} })
        // await this.setToken(token, expiration)
        return process.env.CERTDOX_API_KEY || ''
    }
}
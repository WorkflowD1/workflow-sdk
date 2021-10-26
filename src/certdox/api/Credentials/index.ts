import { Redis } from '../../../common'

export interface CredentialsConfig {
    login: string,
    password: string
}

export class Credentials {
    private login: string
    private password: string

    constructor({ login, password }: CredentialsConfig) {
        this.login = login
        this.password = password
    }

    public async getToken(): Promise<string> {
        // Do something
        let token = ''
        return token
    }

    private async isTokenValid(): Promise<boolean> {
        // Do something more
        return true
    }

    private async setToken(token: string, expiration: number): Promise<void> {
        // More and more and more...
    }
}
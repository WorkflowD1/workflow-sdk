import { ClientOpts } from "redis"
import { Redis, signIn } from "../utils"

export interface CredentialsConfig {
    email: string
    password: string
    baseURL: string
}

export interface CredentialsOptions {
    redis?: ClientOpts & {
        key: string
    }
}

export class Credentials {

    private email: string
    private password: string
    private baseURL: string

    private redis?: Redis

    private static token: string
    private static instance: Credentials

    /**
     * 
     * @param email workflows.d1.cx email 
     * @param password workflows.d1.cx password
     * @param baseURL workflows.d1.cx url without last forward slash
     * @returns This methods return Workflow credentials token
     */
    private constructor({ email, password, baseURL }: CredentialsConfig, { redis }: CredentialsOptions) {
        this.email = email
        this.password = password
        this.baseURL = baseURL.replace(/\/$/, '')

        if(redis) {
            const { key, ...redisClientOptions } = redis
            this.redis = Redis.getInstance(redisClientOptions, key)
        }

        this.getToken()
    }

    public getInstance(credentials: CredentialsConfig, options: CredentialsOptions) {
        if(!Credentials.instance) {
            Credentials.instance = new Credentials(credentials, options)
        }
        return Credentials.instance
    }

    public async getToken(): Promise<string> {
        if(!this.isTokenValid()) {
            const { data: { token, expiration } } = await signIn({email: this.email, password: this.password, baseURL: this.baseURL})
            this.setToken(token, expiration)
        }
        return Credentials.token
    }

    private isTokenValid(): boolean {
        if(this.redis && this.redis.hasToken()) {
            return true
        }
        return false
    }

    private setToken(token: string, expiration: number) {
        if(this.redis) {
            this.redis.updateToken(token, expiration)
        }
        Credentials.token = token
    }
}
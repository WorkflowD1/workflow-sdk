import { ClientOpts } from 'redis'
import { Redis } from '..'

export interface CredentialsOptions {
    redis?: ClientOpts & {
        key: string
    }
}

export abstract class GenericCredentials<T> {
    protected credentials: T
    protected redis?: Redis

    constructor(credentials: T, options?: CredentialsOptions) {
        this.credentials = credentials
        if (options?.redis) {
            const { redis } = options
            const { key, ...redisClientOptions } = redis
            this.redis = Redis.getInstance(redisClientOptions, key)
        }
    }

    public abstract getToken(): Promise<string>

    /**
     * @returns if Redis token is still valid
     */
    protected async isTokenValid(): Promise<boolean> {
        if (this.redis && await this.redis.hasToken()) {
            return true
        }
        return false
    }

    /**
     * @param token Token to be set on redis
     * @param expiration Redis key expiration time
     */
    protected async setToken(token: string, expiration: number): Promise<void> {
        if (this.redis) {
            await this.redis.updateToken(token, expiration)
        }
    }
}
import {createClient, ClientOpts, RedisClient } from "redis";
import { promisify } from 'util'

export class Redis {
    
    private key: string
    private client: RedisClient
    private static instance: Redis
    
    private constructor (options: ClientOpts, key: string) {
        this.key = key
        this.client = createClient(options)
    }
    
    public static getInstance(options: ClientOpts, key: string) {
        if(!Redis.instance) {
            return new Redis(options, key)
        }
        return Redis.instance
    }

    public retrieveToken(): Promise<string | null> {
        const getAsync = promisify(this.client.get)
        return getAsync(this.key)
    }

    public hasToken(): boolean {
        return this.client.get(this.key!)
    }

    public updateToken(token: string, expiration: number) {
        this.client.set(this.key, token)
        this.client.expire(this.key, expiration)
    }
}
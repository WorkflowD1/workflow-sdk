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
        return this.getRedisKeyAsync()
    }

    public async hasToken(): Promise<boolean | null> {
        const token = await this.getRedisKeyAsync()
        return !!token
    }

    public updateToken(token: string, expiration: number) {
        this.client.set(this.key, token)
        this.client.expire(this.key, expiration)
    }

    private getRedisKeyAsync() {
        const getAsync = promisify(this.client.get).bind(this.client)
        return getAsync(this.key)
    }
}
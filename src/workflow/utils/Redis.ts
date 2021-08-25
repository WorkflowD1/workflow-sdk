import { createClient, ClientOpts, RedisClient } from 'redis';
import { promisify } from 'util'

export class Redis {

  private key: string
  private client: RedisClient
  private static instance: Redis

  private constructor(options: ClientOpts, key: string) {
    this.key = key
    this.client = createClient(options)
  }

  public static getInstance(options: ClientOpts, key: string): Redis {
    if (!Redis.instance) {
      return new Redis(options, key)
    }
    return Redis.instance
  }

  public async retrieveToken(): Promise<string> {
    const token = await this.getRedisKeyAsync()
    return token!
  }

  public async updateToken(token: string, expiration: number): Promise<void> {
    await this.setRedisTokenAsync(token)
    await this.expireRedisTokenAsync(expiration)
  }

  public async hasToken(): Promise<boolean | null> {
    const token = await this.getRedisKeyAsync()
    return !!token
  }

  private getRedisKeyAsync(): Promise<string | null> {
    const getAsync = promisify(this.client.get).bind(this.client)
    return getAsync(this.key)
  }

  private setRedisTokenAsync(token: string): Promise<unknown> {
    const setAsync = promisify(this.client.set).bind(this.client)
    return setAsync(this.key, token)
  }

  private expireRedisTokenAsync(expiration: number): Promise<Number> {
    const expireToken = promisify(this.client.expire).bind(this.client)
    const seconds = expiration - Math.floor(new Date().getTime() / 1000)
    return expireToken(this.key, seconds)
  }
}
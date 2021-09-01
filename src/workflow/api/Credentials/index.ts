import { ClientOpts } from 'redis'
import { WorkflowRequest } from '../../utils'
import { Redis } from '../../../common'
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

export interface CredentialsObject {
  default: Credentials
  [key: string]: Credentials
}

export class Credentials {

  private email: string
  private password: string
  private redis?: Redis

  public baseURL: string

  constructor({ email, password, baseURL }: CredentialsConfig, options?: CredentialsOptions | null) {
    this.email = email
    this.password = password
    this.baseURL = baseURL.replace(/\/$/, '')

    if (options?.redis) {
      const { redis } = options
      const { key, ...redisClientOptions } = redis
      this.redis = Redis.getInstance(redisClientOptions, key)
    }
  }

  /**
   * @returns valid token
   */
  public async getToken(): Promise<string> {
    if (this.redis && await this.isTokenValid()) {
      return this.redis.retrieveToken()
    }
    const { data: { token, expiration } } = await WorkflowRequest.signIn({ email: this.email, password: this.password, baseURL: this.baseURL })
    await this.setToken(token, expiration)
    return token
  }

  /**
   * @returns if Redis token is still valid
   */
  private async isTokenValid(): Promise<boolean> {
    if (this.redis && await this.redis.hasToken()) {
      return true
    }
    return false
  }

  /**
   * @param token Token to be set on redis
   * @param expiration Redis key expiration time
   */
  private async setToken(token: string, expiration: number): Promise<void> {
    if (this.redis) {
      await this.redis.updateToken(token, expiration)
    }
  }
}
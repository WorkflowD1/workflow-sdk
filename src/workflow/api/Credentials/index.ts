import { ClientOpts } from 'redis'
import { WorkflowRequest } from '../../utils/WorkflowRequest'
import { Redis } from '../../utils/Redis'
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
  private baseURL: string

  private redis?: Redis

  /**
   * 
   * @param email workflows.d1.cx email 
   * @param password workflows.d1.cx password
   * @param baseURL workflows.d1.cx url without last forward slash
   * @returns This methods return Workflow credentials token
   */
  constructor({ email, password, baseURL }: CredentialsConfig, options: CredentialsOptions | null) {
    this.email = email
    this.password = password
    this.baseURL = baseURL.replace(/\/$/, '')

    if (options?.redis) {
      const { redis } = options
      const { key, ...redisClientOptions } = redis
      this.redis = Redis.getInstance(redisClientOptions, key)
    }
  }

  public async getToken(): Promise<string> {
    if (this.redis && await this.isTokenValid()) {
      return this.redis.retrieveToken()
    }
    const { data: { token, expiration } } = await WorkflowRequest.signIn({ email: this.email, password: this.password, baseURL: this.baseURL })
    await this.setToken(token, expiration)
    return token
  }

  private async isTokenValid(): Promise<boolean> {
    if (this.redis && await this.redis.hasToken()) {
      return true
    }
    return false
  }

  private async setToken(token: string, expiration: number): Promise<void> {
    if (this.redis) {
      await this.redis.updateToken(token, expiration)
    }
  }
}
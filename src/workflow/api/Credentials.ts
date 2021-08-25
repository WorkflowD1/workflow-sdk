import { ClientOpts } from "redis"
import { Redis, WorkflowRequest } from "../utils"
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

  private static instance: Credentials

  /**
   * 
   * @param email workflows.d1.cx email 
   * @param password workflows.d1.cx password
   * @param baseURL workflows.d1.cx url without last forward slash
   * @returns This methods return Workflow credentials token
   */
  private constructor({ email, password, baseURL }: CredentialsConfig, options: CredentialsOptions | null) {
    this.email = email
    this.password = password
    this.baseURL = baseURL.replace(/\/$/, '')

    if (options?.redis) {
      const { redis } = options
      const { key, ...redisClientOptions } = redis
      this.redis = Redis.getInstance(redisClientOptions, key)
    }
  }

  public static getInstance(credentials: CredentialsConfig, options: CredentialsOptions): Credentials {
    if (!Credentials.instance) {
      Credentials.instance = new Credentials(credentials, options)
    }
    return Credentials.instance
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
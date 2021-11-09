import { ClientOpts } from 'redis'
import { WorkflowRequest } from '../../utils'
import { Redis } from '../../../common'
import { CredentialsOptions, GenericCredentials } from '../../../common/GenericCredentials'
export interface CredentialsConfig {
  email: string
  password: string
  baseURL: string
}

export interface CredentialsObject {
  default: Credentials
  [key: string]: Credentials
}

export class Credentials extends GenericCredentials<CredentialsConfig> {

  public baseURL: string

  constructor(auth: CredentialsConfig, options?: CredentialsOptions) {
    super(auth, options)
    this.baseURL = auth.baseURL
  }

  /**
   * @returns valid token
   */
  public async getToken(): Promise<string> {
    if (this.redis && await this.isTokenValid()) {
      return this.redis.retrieveToken()
    }
    const { data: { token, expiration } } = await WorkflowRequest.signIn({ email: this.credentials.email, password: this.credentials.password, baseURL: this.baseURL })
    await this.setToken(token, expiration)
    return token
  }
}
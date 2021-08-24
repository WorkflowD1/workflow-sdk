import { signIn } from "../utils"

export interface CredentialsConfig {
    email: string
    password: string
    baseURL: string
}

export class Credentials {

    private email: string
    private password: string
    private baseURL: string

    /**
     * 
     * @param email workflows.d1.cx email 
     * @param password workflows.d1.cx password
     * @param baseURL workflows.d1.cx url without last forward slash
     * @returns This methods return Workflow credentials token
     */
    constructor({ email, password, baseURL }: CredentialsConfig) {
        this.email = email
        this.password = password
        this.baseURL = baseURL.replace(/\/$/, '')
    }

    public getToken() {
        return signIn({email: this.email, password: this.password, baseURL: this.baseURL})
    }
}
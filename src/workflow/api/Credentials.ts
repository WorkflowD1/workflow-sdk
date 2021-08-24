import { signIn } from "../utils"

export interface CredentialsConfig {
    username: string
    password: string
    url: string
}

export class Credentials {

    private username: string
    private password: string
    private url: string

    /**
     * 
     * @param username workflows.d1.cx username 
     * @param password workflows.d1.cx password
     * @param url workflows.d1.cx url
     */
    constructor({ username, password, url }: CredentialsConfig) {
        this.username = username
        this.password = password
        this.url = url
    }

    public getToken() {
        return signIn({username: this.username, password: this.password, url: this.url})
    }
}
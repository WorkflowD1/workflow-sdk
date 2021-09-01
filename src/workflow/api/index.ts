import { Document } from './Document/'
import { CredentialsObject } from './Credentials/'
import { Attachment } from './Attachment/'
import { Observation } from './Observation/'

export * from './Credentials/'
export interface IdProperty {
  id: number
}

export class Workflow {
  public document: Document
  public observation: Observation
  public attachment: Attachment

  constructor(credentials: CredentialsObject) {
    this.document = new Document(credentials)
    this.attachment = new Attachment(credentials)
    this.observation = new Observation(credentials)
  }
}
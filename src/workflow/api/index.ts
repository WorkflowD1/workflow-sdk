import { Document } from './Document/'
import { CredentialsObject } from './Credentials/'
import { Attachment } from './Attachment/'
import { Observation } from './Observation/'
import { Status } from './Status'

export * from './Credentials/'
export interface IdProperty {
  id: number
}

export class Workflow {
  public document: Document
  public observation: Observation
  public attachment: Attachment
  public status: Status

  constructor(credentials: CredentialsObject) {
    this.document = new Document(credentials)
    this.attachment = new Attachment(credentials)
    this.observation = new Observation(credentials)
    this.status = new Status(credentials)
  }
}
import { CredentialsObject } from './Credentials';
import { MethodAuthentication } from '../utils/Decorators';
import { WorkflowRequest } from '../utils/WorkflowRequest';

export interface IdProperty {
  id: number
}
export interface CreateDocumentProperties {
  status_id: number
  product_id: number
  modality_identifier: string
  cpf: string
  name: string
  phone?: string
  email?: string
  [key: string]: any
}

export interface UpdateDocumentProperties extends CreateDocumentProperties, IdProperty { }

export interface LoadDocumentProperties {
  modality_identifier?: string[],
  products?: number[]
  status_id?: number[]
  uuid?: string[]
  protocol?: string[]
  email?: string[]
  phone?: string[]
  name?: string[]
  initialDate?: string
  finalDate?: string
  categories?: string[]
}

@MethodAuthentication()
export class Document extends WorkflowRequest {
  
  constructor(baseURL: string, credentialsObject: CredentialsObject) {
    super(baseURL, credentialsObject)
  }
  
  public async create(document: CreateDocumentProperties, credentialsKey?: string) {
    const { status, data } = await this.documentCreate(document)
    return {
      status,
      data
    }
  }

  public async update(document: UpdateDocumentProperties, credentialsKey?: string) {
    const { status, data } = await this.documentUpdate(document)
    return {
      status,
      data
    }
  }

  public async load(document: LoadDocumentProperties, credentialsKey?: string) {
    const { status, data } = await this.documentLoad(document)
    return {
      status,
      data
    }
  }

  public async loadById(document: IdProperty, credentialsKey?: string) {
    const { status, data } = await this.documentLoadById(document)
    return {
      status,
      data
    }
  }

}
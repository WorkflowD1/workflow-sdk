import { BaseWorkflowRequest } from '.';
import { WorkflowRequest } from '../utils';
import { Credentials } from './Credentials';

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

export class Document extends BaseWorkflowRequest {

  constructor(baseURL: string, credentials: Credentials) {
    super(baseURL, credentials)
  }

  public async create(document: CreateDocumentProperties) {
    const { status, data } = await this.workflowRequest.documentCreate(document)
    return {
      status,
      data
    }
  }

  public async update(document: UpdateDocumentProperties) {
    const { status, data } = await this.workflowRequest.documentUpdate(document)
    return {
      status,
      data
    }
  }

  public async load(document: LoadDocumentProperties) {
    const { status, data } = await this.workflowRequest.documentLoad(document)
    return {
      status,
      data
    }
  }

  public async loadById(document: IdProperty) {
    const { status, data } = await this.workflowRequest.documentLoadById(document)
    return {
      status,
      data
    }
  }

}
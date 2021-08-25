import { WorkflowRequest } from "../utils";

export interface UpdateDocumentProperties {
  id: number
  status_id: number
  product_id: number
  modality_identifier: string
}

export interface CreateDocumentProperties extends Omit<UpdateDocumentProperties, 'id'> { }

export interface LoadDocumentProperties {

}

export class Document {

  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL.replace(/\/$/, '')
  }

  public async create(document: CreateDocumentProperties, token: string) {
    const { status, data } = await WorkflowRequest.documentCreate(document, token, this.baseURL)
    return {
      status,
      data
    }
  }

  public async update(document: UpdateDocumentProperties, token: string) {
    const { data } = await WorkflowRequest.documentUpdate(document, token, this.baseURL)
    return {
      status,
      data
    }
  }

  public async load(document: UpdateDocumentProperties, token: string) {
    const { status, data } = await WorkflowRequest.documentLoad(document, token, this.baseURL)
    return {
      status,
      data
    }
  }

}
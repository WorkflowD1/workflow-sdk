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

  public async create(document: CreateDocumentProperties, token: string) {
    const { status, data } = await WorkflowRequest.documentCreate(document, token)
    return {
      status,
      data
    }
  }

  public async update(document: UpdateDocumentProperties, token: string) {
    const { data } = await WorkflowRequest.documentUpdate(document, token)
    return {
      status,
      data
    }
  }

  public async load(document: UpdateDocumentProperties, token: string) {
    const { status, data } = await WorkflowRequest.documentLoad(document, token)
    return {
      status,
      data
    }
  }

}
import { WorkflowRequest } from '../utils'
import { Credentials } from './Credentials'

export abstract class BaseWorkflowRequest {
  
  protected baseURL: string
  protected workflowRequest: WorkflowRequest

  constructor(baseURL: string, credentials: Credentials) { 
    this.baseURL = baseURL, 
    this.workflowRequest = new WorkflowRequest(baseURL, credentials)
  }
}

export * from './Credentials'
export * from './Document'
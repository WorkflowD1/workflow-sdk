import { IdProperty, CredentialsObject } from "."
import { WorkflowRequest } from "../utils"
import { MethodAuthentication } from "../utils/Decorators"

export interface UploadFileAttachmentProperties {
  document_id:  number
	name:  string
	description:  string
	filename:  string
	path:  string
	driver:  string
	status:  string
	send_attachment:  boolean
}

export interface UpdateAttachmentProperties extends IdProperty {}

type Pendency = {
  document_id: number
  name: string
  description: string
  status: string
}

export interface CreatePendencyProperties {
  pendencies: Pendency[] 
}

export interface LoadPendencyProperties {
  document_id: number
}

@MethodAuthentication()
export class Attachment extends WorkflowRequest {
  constructor(baseURL: string, credentialsObject: CredentialsObject) {
    super(baseURL, credentialsObject)
  }

  
  public async uploadFile(attachment: UploadFileAttachmentProperties, credentialsKey?: string) {
    const { status, data } = await this.attachmentUploadFile(attachment)
    return {
      status,
      data
    }
  }

  public async update(attachment: UpdateAttachmentProperties, credentialsKey?: string) {
    const { status, data } = await this.attachmentUpdateById(attachment)
    return {
      status,
      data
    }
  }
  
  public async createPendency(pendency: CreatePendencyProperties, credentialsKey?: string) {
    const { status, data } = await this.attachmentCreatePendency(pendency)
    return {
      status,
      data
    }
  }

  public async loadPendency(pendency: LoadPendencyProperties, credentialsKey?: string) {
    const { status, data } = await this.attachmentLoadPendency(pendency)
    return {
      status,
      data
    }
  }

}
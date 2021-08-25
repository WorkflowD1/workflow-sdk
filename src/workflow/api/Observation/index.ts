import { CredentialsObject } from './../Credentials';
import { MethodAuthentication } from "../../utils/Decorators";
import { WorkflowRequest } from "../../utils";
import { IdProperty } from '..';

export interface CreateObservationProperties {
  document_id: number
  message: string
  observation_from: string
  section: string
  send_communication: boolean
}

export interface DeleteObservationProperties extends IdProperty { }

@MethodAuthentication()
export class Observation extends WorkflowRequest {

  constructor(baseURL: string, credentialsObject: CredentialsObject) {
    super(baseURL, credentialsObject)
  }

  public async create(observation: CreateObservationProperties, credentialsKey?: string) {
    const { status, data } = await this.observationCreate(observation)
    return {
      status,
      data
    }
  }

  public async delete(observation: DeleteObservationProperties, credentialsKey?: string) {
    const { status, data } = await this.observationDeleteById(observation)
    return {
      status,
      data
    }
  }
  
}
import { CredentialsObject } from "..";
import { WorkflowRequest } from "../../utils";
import { MethodAuthentication } from "../../utils/Decorators";

export interface LoadStatusTransitionProperties {
    products: Array<number>
}

@MethodAuthentication()
export class Status extends WorkflowRequest {
    constructor(credentialsObject: CredentialsObject) {
        super(credentialsObject)
    }

    public async loadTransition(ids: LoadStatusTransitionProperties) {
        const { status, data } = await this.statusLoadTransition(ids);
        return {
            status,
            data
        }
    }
}
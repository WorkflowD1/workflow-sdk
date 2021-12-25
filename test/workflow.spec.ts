import { Credentials } from '../src'
import test from 'japa'
import sinon, { assert } from 'sinon'
import { WorkflowRequest } from '../src/workflow/utils'
import { CredentialsObject, IdProperty, Workflow } from '../src'
import { CreateDocumentProperties, LoadDocumentProperties, UpdateDocumentProperties } from '../src/workflow/api/Document'
import { CreateObservationProperties, DeleteObservationProperties } from '../src/workflow/api/Observation'
import { CreatePendencyProperties, LoadPendencyProperties, UpdateAttachmentProperties, UploadFileAttachmentProperties } from '../src/workflow/api/Attachment'
import { LoadStatusTransitionProperties } from '../src/workflow/api/Status'

const baseURL = 'https://'
const token = 'token1'

test.group('Workflow integration', (group) => {

  group.before(() => {
    sinon.mock(Credentials.prototype).expects('getToken').returns(token)
  })

  group.after(() => {
    sinon.restore()
  })

  test('Should test credentials constructor', (assert) => {
    assert.doesNotThrow(() => {
      new Credentials({ email: '', password: '', baseURL })
    })
  })

  test('Should test credentials constructor with redis config', (assert) => {
    const redis = { host: '', port: '' } as any
    assert.doesNotThrow(() => {
      new Credentials({ email: '', password: '', baseURL }, { redis: redis })
    })
  })

  test('Should test getToken function', async (assert) => {
    const credential = new Credentials({ email: '', password: '', baseURL })
    assert.deepEqual(await credential.getToken(), token)
  })
})


test.group('WorkflowRequest', (group) => {


  const mockRequest = (response: any) => {
    sinon.mock(WorkflowRequest.prototype).expects('request').atLeast(1).returns(response)
    return response
  }

  group.beforeEach(() => {
    sinon.mock(Credentials.prototype).expects('getToken').returns(token)
  })

  group.afterEach(() => {
    sinon.restore()
  })

  const credentialsObject: CredentialsObject = {
    default: new Credentials({ email: '', password: '', baseURL })
  }

  const workflow = new Workflow(credentialsObject)

  test('Should call create for Document property', async (assert) => {
    const response = mockRequest({
      status: 201,
      data: {
        status_id: 1,
        product_id: 1,
        modality_identifier: 'Modality',
        cpf: '0',
        name: 'name',
        email: 'email',
        phone: 'phone'
      } as CreateDocumentProperties
    })

    const document = await workflow.document.create(response.data)
    assert.deepEqual(document.status, response.status)
    assert.deepEqual(document.data, response.data)
    assert.deepEqual(document, response)
  })

  test('Should call update for Document property', async (assert) => {
    const response = mockRequest({
      status: 200,
      data: {
        id: 1,
        status_id: 1,
        product_id: 1,
      } as UpdateDocumentProperties
    })

    const document = await workflow.document.update(response.data)
    assert.deepEqual(document.status, response.status)
    assert.deepEqual(document.data, response.data)
    assert.deepEqual(document, response)
  })

  test('Should call load for Document property', async (assert) => {
    const request: LoadDocumentProperties = {
      status_id: [1]
    }

    const response = mockRequest({
      status: 200,
      data: [
        {
          id: 1
        }
      ]
    })

    const document = await workflow.document.load(request)
    assert.deepEqual(document.status, response.status)
    assert.deepEqual(document.data, response.data)
    assert.deepEqual(document, response)
  })

  test('Should call loadById for Document property', async (assert) => {
    const request: IdProperty = {
      id: 1
    }

    const response = mockRequest({
      status: 200,
      data: {
        id: 1
      }
    })

    const document = await workflow.document.loadById(request)
    assert.deepEqual(document.status, response.status)
    assert.deepEqual(document.data, response.data)
    assert.deepEqual(document, response)
  })

  test('Should call create for Observation property', async (assert) => {
    const request: CreateObservationProperties = {
      document_id: 1,
      message: 'message',
      observation_from: 'client',
      section: 'section',
      send_communication: true
    }

    const response = mockRequest({
      status: 201,
      data: request
    })

    const observation = await workflow.observation.create(request)

    assert.deepEqual(observation.status, response.status)
    assert.deepEqual(observation.data, response.data)
    assert.deepEqual(observation, response)
  })

  test('Should call delete for Observation property', async (assert) => {
    const request: DeleteObservationProperties = {
      id: 1
    }

    const response = mockRequest({
      status: 201,
      data: request
    })

    const observation = await workflow.observation.delete(request)

    assert.deepEqual(observation.status, response.status)
    assert.deepEqual(observation.data, response.data)
    assert.deepEqual(observation, response)
  })

  test('Should call createPendency for Attachment property', async (assert) => {
    const request: CreatePendencyProperties = {
      pendencies: [
        {
          description: 'description',
          document_id: 1,
          name: 'name',
          status: 'status'
        }
      ]
    }

    const response = mockRequest({
      status: 201,
      data: request
    })

    const attachment = await workflow.attachment.createPendency(request)

    assert.deepEqual(attachment.status, response.status)
    assert.deepEqual(attachment.data, response.data)
    assert.deepEqual(attachment, response)
  })

  test('Should call loadPendency for Attachment property', async (assert) => {
    const request: LoadPendencyProperties = {
      document_id: 1
    }

    const response = mockRequest({
      status: 201,
      data: request
    })

    const attachment = await workflow.attachment.loadPendency(request)

    assert.deepEqual(attachment.status, response.status)
    assert.deepEqual(attachment.data, response.data)
    assert.deepEqual(attachment, response)
  })

  test('Should call update for Attachment property', async (assert) => {
    const request: UpdateAttachmentProperties = {
      id: 1,
      description: 'description'
    }

    const response = mockRequest({
      status: 201,
      data: request
    })

    const attachment = await workflow.attachment.update(request)

    assert.deepEqual(attachment.status, response.status)
    assert.deepEqual(attachment.data, response.data)
    assert.deepEqual(attachment, response)
  })

  test('Should call uploadFile for Attachment property', async (assert) => {
    const request: UploadFileAttachmentProperties = {
      description: 'description',
      document_id: 1,
      driver: 'driver',
      filename: 'filename',
      name: 'name',
      path: 'path',
      send_attachment: true,
      status: 'status'
    }

    const response = mockRequest({
      status: 201,
      data: request
    })

    const attachment = await workflow.attachment.uploadFile(request)

    assert.deepEqual(attachment.status, response.status)
    assert.deepEqual(attachment.data, response.data)
    assert.deepEqual(attachment, response)
  })

  test('Should call loadTransition for Status property', async (assert) => {
    const request: LoadStatusTransitionProperties = {
      products: [1]
    }

    const response = mockRequest({
      status: 200,
      data: request
    })

    const transitions = await workflow.status.loadTransition(request)

    assert.deepEqual(transitions.status, response.status)
    assert.deepEqual(transitions.data, response.data)
  })
})
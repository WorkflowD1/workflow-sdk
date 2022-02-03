# Workflow SDK for JavaScript

[![NPM version](https://img.shields.io/npm/v/@workflowd1/workflow-sdk.svg)](https://www.npmjs.com/package/@workflowd1/workflow-sdk)
[![NPM downloads](https://img.shields.io/npm/dm/@workflowd1/workflow-sdk.svg)](https://www.npmjs.com/package/@workflowd1/workflow-sdk)

## Contents

* [Workflow](#workflow)

* [Common](#common)

## How to install

The Workflow SDK is compatible with Node.js 14+, as is written in TypeScript. The way to install Workflow SDK for Node.js is to use [npm](http://npmjs.org) package manager:

```sh
npm i @workflowd1/workflow-sdk
```

You can also use [yarn](https://yarnpkg.com/), by simply type:

```sh
yarn add @workflowd1/workflow-sdk
```

## Workflow
To use Workflow features, you should know some basic information, as which Tenant URL you are consuming. With that in mind, now you need to have some credentials to call the available operations, and the credential that is active will be the one related on logs.
### Credentials
This class main responsibility is store one credential, that is basically one email, one password and the Tenant URL.

```javascript
const { Credentials } = require('@workflows/workflow-sdk')

const userCredential = new Credentials({email: 'email@email.com', password: 'strongPassword', baseURL: 'tenant.url.com'})
```

You can also create multiple credentials only by instancing a new class

```javascript
const { Credentials } = require('@workflows/workflow-sdk')

const userOneCredential = new Credentials({ email: 'email1@email.com', password: 'strongPassword', baseURL: 'tenant.url.com' })

const userTwoCredential = new Credentials({ email: 'email2@email.com', password: 'strongPassword', baseURL: 'tenant.url.com' })
```

It is important to know that the baseURL needs to be the one you are operating on. If you pass any other tenant URL, all the calls will be made on that, and it may cause you some problems. 

Also credentials will be consumed by Workflow classes as an object and it has the following structure.

``` javascript
{
  'default': new Credentials({ email, password, baseURL }), // ('default' key is mandatory, and will applied if no other specified)
  'custom': new Credentials({ email, password, baseURL })
}
```

Credentials can also be instanced with [Redis](#redis), it can be configured at the second parameter on constructor, it is basically connection options and a key that will store the authentication token, as  the example bellow:

```javascript
const userOneCredential = new Credentials(auth, { redis: { host: '', port: '', key: '' }})
```

### Entities

All Workflow entities are available on the same class, as properties. This properties are references to classes that execute entity operations, as create or update. It is essential that Credentials are configured. 

It should be instanced as below:

```javascript
const { Workflow } = require('@workflows/workflow-sdk')

const workflowHandler = new Workflow({ default: defaultCredential, [key]: new Credential(auth) })
```

All the credentials that were passed on class constructor will be available as credential key on subsequent calls for any entity. The methods available are basically an easy axios call, all the parameters are described on [API](https://docs.workflow.d1.cx/) references.

The methods follow a pattern on parameters that is:

``` javascript
// Credential key is optional and references to Workflow constructor.
async function(data: RequestBody, credentialsKey?: string) {
  //If no credential key is provided, default key will be set.
  this.currentCredentials = this.credentialsObject[credentialKey]
}
```

#### Document
* [create](https://docs.workflow.d1.cx/configuracoes/apis#create)
``` javascript
const newDocument = await workflowHandler.document.create(createParams: object)
```
* [update](https://docs.workflow.d1.cx/configuracoes/apis#updatebyid)
``` javascript
const updatedDocument = await workflowHandler.document.update(updateParams: object)
```
* [load]()
``` javascript
const loadDocument = await workflowHandler.document.load(loadParams: object)
```
* [loadById](https://docs.workflow.d1.cx/configuracoes/apis#loadbyid)
``` javascript
const loadDocument = await workflowHandler.document.loadById(idParam: object)
```

#### Attachment

* [uploadFile](https://docs.workflow.d1.cx/configuracoes/attachment#upload-link)
``` javascript
const newAttachment = await workflowHandler.attachment.uploadFile(createParams: object)
```
* [update](https://docs.workflow.d1.cx/configuracoes/attachment#updatebyid)
``` javascript
const updatedAttachment = await workflowHandler.attachment.update(updateParams: object)
```
* [createPendency](https://docs.workflow.d1.cx/configuracoes/attachment#creatependency-post)
``` javascript
const newPendency = await workflowHandler.attachment.createPendency(loadParams: object)
```
* [loadPendency](https://docs.workflow.d1.cx/configuracoes/attachment#loadpendency)
``` javascript
const loadPendency = await workflowHandler.attachment.loadPendency(idParam: object)
```

#### Observation

* create
```javascript
const createParams = {
  document_id: number,
  message: string,
  observation_from: string,
  section: string,
  send_communication: boolean
}

const createObservation = await workflowHandler.observation.create(createParams)
```
* delete
```javascript
const deleteObservation = await workflowHandler.observation.delete({ id: idToDelete })
```

## CertDox
You can you CertDox integration easily in your codes just instantiating it. Follow the example below:
```javascript
const { Certdox } = require('@workflowd1/workflow-sdk')

const certdox = new Certdox('your_api_key_here')
```

### Voucher

* ask
```javascript
const data = [
  {
    tipoCombo: "1",
    idDocumento: "10101010",
    nome: "Nome",
    cpfCnpj: "000.000.000-00",
    cidade: "São Paulo",
    uf: "SP",
    nomeMae: "Nome da Mãe",
    nomePai: "Nome do Pai",
    rg: "99999999",
    dataNascimento: "10-10-1900",
    informacoesAdicionais: "Informações adicionais"
  }
]

const res = await certdox.voucher.ask(data)
```

### Register

* ask
```javascript
const data = {
  tipoCombo: "1",
  idDocumento: "10101010",
  cartorio: "Nome do Cartorio",
  cidade: "São Paulo",
  uf: "SP",
  numeroContrato: "123123123",
  partes: [
    {
      nome: "Nome da parte",
      cpf: "000.000.000-00",
      tipoDocumento: "RG"
    }
  ],
  documentos: [
    {
      tipoDocumento: "CPF",
      urlDocumento: "https://url-do-documento/documento.pdf"
    }
  ],
  informacoesAdicionais: "Informações adicionais"
}

const res = await certdox.register.ask(data)
```
### Requirements

* ask
```javascript
const data = {
    idPedido: "10101010",
    idSmarkio: "20202020",
    textoSolucao: "Texto contendo teste"
}

const res = await certdox.requirements.ask(data)
```


## Common

There is some classes that can be used by any other module or consumer. They are called 'Common'.
### Redis
Redis class is based on Singleton, and should be used as one.

```javascript
const redisInstance = Redis.getInstance(options, key);
```
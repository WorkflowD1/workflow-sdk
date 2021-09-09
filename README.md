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

Also credentials will be consumed by Workflow classes as an object and it has this structure.

``` javascript
{
  'default': new Credentials({ email, password, baseURL }), // ('default' key is mandatory, and will applied if no other specified)
  'custom': new Credentials({ email, password, baseURL })
}
```
### General

All Workflow entities are available on the same class, as properties. This properties are references to classes that execute entity operations, as create or update. It is 

## Common

### Redis
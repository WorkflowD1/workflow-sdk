const { Document, Credentials } = require('../index')

async function teste() {
  try {

    const baseURL = 'https://staging-api.portosda.com'

    const emersonCredentials = new Credentials({
      email: 'emerson.santos@smarkio.com.br',
      password: 'emerson12',
      baseURL
    })

    const documentHandler = new Document(baseURL, { default: emersonCredentials })

    const { data: document} = await documentHandler.create({
      'status_id': 2,
      'product_id': 1,
      'modality_identifier': 'Aquisição',
      'name': 'Emerson SDK',
      'cpf': '000123'
    })

    console.log(document)
    
    return
  } catch (error) {
    console.log(error)
    return error
  }
}

teste()
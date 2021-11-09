import test from 'japa';
import sinon from 'sinon';
import { Certdox, CertdoxCredentialsObject } from '../src';
import { CertdoxCredentials } from '../index';
import { CertdoxRequest } from '../src/certdox/utils';

const token = 'tokenteste';

test.group('CertDox Integration', (group) => {
  group.before(() => {
    sinon.mock(CertdoxCredentials.prototype).expects('getToken').returns(token);
  });

  group.after(() => {
    sinon.restore();
  });

  test('Should test credentials constructor', (assert) => {
    assert.doesNotThrow(() => {
      new CertdoxCredentials({ login: '', password: '' });
    });
  });

  test('Should test credentials constructor with redis config', (assert) => {
    const redis = { host: '', port: '' } as any;
    assert.doesNotThrow(() => {
      new CertdoxCredentials({ login: '', password: '' }, { redis: redis });
    });
  });

  test('Should test getToken function', async (assert) => {
    const credential = new CertdoxCredentials({ login: '', password: '' });
    assert.deepEqual(await credential.getToken(), token);
  });
});

test.group('CertDox Request', (group) => {
  const mockRequest = (response: any) => {
    sinon.mock(CertdoxRequest.prototype).expects('request').atLeast(1).returns(response);
    return response;
  };

  group.beforeEach(() => {
    sinon.mock(CertdoxCredentials.prototype).expects('getToken').returns(token);
  });

  group.afterEach(() => {
    sinon.restore();
  });

  const credentialsObject: CertdoxCredentialsObject = {
    default: new CertdoxCredentials({ login: '', password: '' }),
  };

  const certdox = new Certdox(credentialsObject);

  test('Should call ask for Voucher property', async (assert) => {
    const response = mockRequest({
      status: 200,
      data: {
        statusCode: 200,
        message: 'Solicitação processada com sucesso',
        protocolo: '5b730b20-e346-577e-a90e-9c2c78e23f45',
        data: '[{"identificador": "CERT#5b730b20-e346-577e-a90e-9c2c78e23f45", "status": "sucesso", "data": {"tipoCombo": "1", "idDocumento": "10101010", "nome": "Nome", "cpfCnpj": "000.000.000-00", "cidade": "S\\u00e3o Paulo", "uf": "SP", "nomeMae": "Nome da M\\u00e3e", "nomePai": "Nome do Pai", "rg": "99999999", "dataNascimento": "10-10-1900", "informacoesAdicionais": "Informa\\u00e7\\u00f5es adicionais", "pk": "5b730b20-e346-577e-a90e-9c2c78e23f45", "sk": "CERT#5b730b20-e346-577e-a90e-9c2c78e23f45", "status": 1, "date_time_millis": "05/11/2021, 19:32:34"}}]',
      },
    });

    const voucher = await certdox.voucher.ask(response.data);
    assert.deepEqual(voucher.status, response.status);
    assert.deepEqual(voucher.data, response.data);
    assert.deepEqual(voucher, response);
  });

  test('Should call ask for Register property', async (assert) => {
    const response = mockRequest({
      status: 200,
      data: {
        statusCode: 200,
        message: 'Solicitação processada com sucesso',
        protocolo: 'e423fef1-9879-5a48-800f-5613fabcbe8e',
      },
    });

    const register = await certdox.register.ask(response.data);
    assert.deepEqual(register.status, response.status);
    assert.deepEqual(register.data, response.data);
    assert.deepEqual(register, response);
  });
});

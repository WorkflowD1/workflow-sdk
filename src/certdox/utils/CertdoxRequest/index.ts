import request from 'axios';

export abstract class CertdoxRequest {
  private apiKey: string;
  private baseUrlDev: string;
  private baseUrlProd: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrlDev = 'https://gw-homolog.cdxti.com.br/smarkioapp/v1';
    this.baseUrlProd = 'https://gw.cdxti.com.br/smarkioapp/v1';
  }

  protected requestVoucher(data: any) {
    return this.request('/certidao', data);
  }

  protected requestRegister(data: any) {
    return this.request('/registro', data);
  }

  protected requestRequirements(data: any) {
    return this.request('/exigencia', data);
  }

  private async request(url: string, data: any) {
    let dataFiltered = data;
    delete dataFiltered.env;

    return request({
      baseURL: data.env === 'dev' ? this.baseUrlDev : this.baseUrlProd,
      url,
      method: 'POST',
      headers: {
        apikey: this.apiKey,
      },
      data: dataFiltered,
    });
  }
}

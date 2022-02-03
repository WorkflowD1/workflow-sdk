import request from 'axios';

export abstract class CertdoxRequest {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://gw-homolog.cdxti.com.br/smarkioapp/v1';
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
    return request({
      baseURL: this.baseUrl,
      url,
      method: 'POST',
      headers: {
        apikey: this.apiKey,
      },
      data,
    });
  }
}

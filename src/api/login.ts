import Request from '../request/request';
import { HttpResponse } from '../types';

interface LoginParams {
  username: string;
  password: string;
}

export class UserService {
  static async login(url: string): Promise<HttpResponse> {
    return Request(`/rest/bi/redirect/url=${url}`, {
      method: 'get',
      responseType: 'json',
      params: {},
    });
  }

  static async resgister(params: LoginParams): Promise<HttpResponse> {
    return Request('/rest/bi/out', {
      method: 'get',
      responseType: 'json',
      params: {},
    });
  }
}

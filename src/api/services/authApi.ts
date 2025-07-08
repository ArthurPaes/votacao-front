import { httpService } from './httpService';
import type { IRequestLogin, IResponseLogin } from '../interfaces/auth';

export class AuthApi {
  async authenticateUser(requestBody: IRequestLogin): Promise<IResponseLogin> {
    const response = await httpService.post('/auth', requestBody);
    localStorage.setItem('@UserData', JSON.stringify(response));
    return response;
  }
}

export const authApi = new AuthApi(); 
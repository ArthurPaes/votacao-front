import { httpService } from './httpService';
import type { ICreateUserRequest } from '../interfaces/user';
import type { IResponseLogin } from '../interfaces/auth';

export class UserApi {
  async createUser(requestBody: ICreateUserRequest): Promise<IResponseLogin> {
    const response = await httpService.post('/user', requestBody);
    return response;
  }
}

export const userApi = new UserApi(); 
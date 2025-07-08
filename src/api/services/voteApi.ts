import { httpService } from './httpService';
import type { IVoteBody } from '../interfaces/vote';

export class VoteApi {
  async voteOnSection(requestBody: IVoteBody): Promise<any> {
    const response = await httpService.post('/votes', requestBody);
    return response;
  }
}

export const voteApi = new VoteApi(); 
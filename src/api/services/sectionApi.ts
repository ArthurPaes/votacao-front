import { httpService } from './httpService';
import type { 
  ICreateSectionRequest, 
  ICreateSectionResponse, 
  IGetAllSectionsResponse 
} from '../interfaces/section';

export class SectionApi {
  async createSection(requestBody: ICreateSectionRequest): Promise<ICreateSectionResponse> {
    const response = await httpService.post('/section', requestBody);
    return response;
  }

  async getAllSections(userId: number): Promise<IGetAllSectionsResponse[]> {
    const response = await httpService.get(`/section?userId=${userId}`);
    return response;
  }
}

export const sectionApi = new SectionApi(); 
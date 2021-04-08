import { HttpService, Injectable } from '@nestjs/common';
import { HttpIntegrationService } from 'src/shared/http-integration.service';
import { JSONPlaceholderUser } from './interfaces/jsonplace-holder-user';

@Injectable()
export class JsonplaceholderService extends HttpIntegrationService {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async findUsers(): Promise<JSONPlaceholderUser[]> {
    const response = await this.httpService.get('/users').toPromise();
    return response.data;
  }
}

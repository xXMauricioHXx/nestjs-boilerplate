import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { HttpModule, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';

describe('JsonplaceholderService', () => {
  let jsonplaceholderService: JsonplaceholderService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JsonplaceholderService],
      imports: [HttpModule],
    }).compile();

    jsonplaceholderService = module.get<JsonplaceholderService>(
      JsonplaceholderService
    );
    httpService = module.get<HttpService>(HttpService);
  });

  describe('#findUsers', () => {
    it('should return an array of users', async () => {
      const payload: AxiosResponse = {
        data: [
          {
            id: 1,
            name: 'fernando',
            username: 'nando',
            email: 'nando@4all.com',
          },
        ],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementation(() => of(payload));

      const result = await jsonplaceholderService.findUsers();

      expect(result).toEqual(payload.data);
    });
  });
});

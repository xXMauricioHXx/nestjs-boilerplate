import { ApmService } from 'src/apm/apm.service';
import { TestingModule, Test } from '@nestjs/testing';
import elasticApmNode from 'elastic-apm-node';
import { ConfigService } from '@nestjs/config';

describe('ApmService', () => {
  let apmService: ApmService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApmService,
        { provide: ConfigService, useValue: new ConfigService(null) },
      ],
    }).compile();

    apmService = module.get<ApmService>(ApmService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(apmService).toBeDefined();
  });

  describe('#onModuleInit', () => {
    it('should started elasticApmNode when exist config', async () => {
      jest.spyOn(configService, 'get').mockImplementation(() => 'test');
      jest.spyOn(elasticApmNode, 'start').mockImplementation(() => undefined);

      apmService.onModuleInit();

      expect(elasticApmNode.start).toBeCalled();
    });
  });
});

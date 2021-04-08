import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import elasticApmNode from 'elastic-apm-node';
import { ApmLogger } from './apm.logger';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApmService implements OnModuleInit {
  private readonly logger = new Logger(ApmService.name);

  constructor(readonly configService: ConfigService) {}

  onModuleInit() {
    const [apmServiceName, apmServiceUrl] = [
      this.configService.get('apm.name'),
      this.configService.get('apm.url'),
    ];
    if (apmServiceName && apmServiceUrl) {
      elasticApmNode.start({
        serviceName: apmServiceName,
        serverUrl: apmServiceUrl,
        logger: new ApmLogger(this.logger),
      });
      this.logger.log('Registered in APM server');
    }
  }
}

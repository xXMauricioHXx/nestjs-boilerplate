import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JsonplaceholderService } from './jsonplaceholder.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('jsonplaceholder.url'),
        timeout: configService.get('jsonplaceholder.timeout'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JsonplaceholderService],
  exports: [JsonplaceholderService],
})
export class JsonPlaceholderModule {}

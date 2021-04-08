import { Module } from '@nestjs/common';
import { ApmService } from './apm.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ApmService],
})
export class ApmModule {}

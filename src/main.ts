import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { CodedValidatorPipe } from './shared/coded-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CodedValidatorPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('port'));
}
bootstrap();

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { UserModule } from './user/user.module';
import { ApmModule } from './apm/apm.module';
import { User } from './user/user.entity';
import { LoginModule } from './login/login.module';
import { AuthMiddleware } from './shared/auth.middleware';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ApmModule,
    ScheduleModule.forRoot(),
    UserModule,
    LoginModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.schema'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        synchronize: true,
        migrationsRun: true,
        entities: [User],
      }),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}

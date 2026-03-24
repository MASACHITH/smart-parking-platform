import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenancyMiddleware } from './tenancy.middleware';

@Module({})
export class TenancyModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TenancyMiddleware).forRoutes('sites');
  }
}

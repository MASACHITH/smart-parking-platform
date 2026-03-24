import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PlatformModule } from './modules/platform/platform.module';
import { SitesModule } from './modules/sites/sites.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PlatformModule,
    TenancyModule,
    AuthModule,
    UsersModule,
    SitesModule,
  ],
})
export class AppModule {}

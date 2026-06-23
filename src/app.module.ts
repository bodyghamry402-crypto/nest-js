import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';

import configuration from './config/configuration';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ): { uri: any } => ({
        uri: configService.get('database').url,
      }),
    }),

    AuthModule,
    UserModule,
    ProductModule,
    BrandModule,
  ],

  controllers: [],

  providers: [AppService],
})
export class AppModule {}
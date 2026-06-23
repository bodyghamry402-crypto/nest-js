import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import KeyvRedis from '@keyv/redis';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createCacheOptions(): CacheModuleOptions {
    // setup configurations
    return {
      ttl: 60 * 60 * 1000,
      stores: new KeyvRedis(this.configService.get('redis').host),
    };
  }
}
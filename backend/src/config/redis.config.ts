import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import * as dotenv from 'dotenv';
dotenv.config();
export const redisConfig: CacheModuleOptions = {
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10),
  ttl: parseInt(process.env.CACHE_TTL, 10),
};
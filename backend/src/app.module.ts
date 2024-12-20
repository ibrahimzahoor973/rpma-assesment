import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { redisConfig } from './config/redis.config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CacheModule.register(redisConfig),
    ItemsModule,
    AuthModule,
  ],
})
export class AppModule { }
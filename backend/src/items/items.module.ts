import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';
import { Item, ItemSchema } from './schemas/item.schema';
import { CacheService } from '@/common/services/cache.service';
import { redisConfig } from '@/config/redis.config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    CacheModule.register(redisConfig),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, CacheService],
})
export class ItemsModule { }
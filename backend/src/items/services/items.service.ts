import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../schemas/item.schema';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { CacheService } from '@/common/services/cache.service';
import { CACHE_KEYS } from '@/common/constants/cache-keys.constant';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    private cacheService: CacheService,
  ) { }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    const savedItem = await createdItem.save();

    // Invalidate the all items cache when a new item is created
    await this.cacheService.del(CACHE_KEYS.ITEMS.ALL);

    return savedItem;
  }

  async findAll(): Promise<Item[]> {
    try {

      // Try to get items from cache
      const cachedItems = await this.cacheService.get<Item[]>(CACHE_KEYS.ITEMS.ALL);
      if (cachedItems) {
        return cachedItems;
      }

      // If not in cache, get from database
      const items = await this.itemModel.find().exec();
      // Store in cache with TTL
      await this.cacheService.set(
        CACHE_KEYS.ITEMS.ALL,
        items,
        CACHE_KEYS.TTL.ITEMS
      );
      console.log('Data successfully saved to Redis.');
      return items;
    } catch (error) {
      console.log(error.message, "error")
    }
  }

  async findOne(id: string): Promise<Item> {
    // Try to get item from cache
    const cacheKey = CACHE_KEYS.ITEMS.BY_ID(id);
    const cachedItem = await this.cacheService.get<Item>(cacheKey);
    if (cachedItem) {
      return cachedItem;
    }

    // If not in cache, get from database
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    // Store in cache with TTL
    await this.cacheService.set(
      cacheKey,
      item,
      CACHE_KEYS.TTL.ITEM_DETAILS
    );

    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const updatedItem = await this.itemModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();

    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    // Invalidate both the specific item cache and the all items cache
    await this.cacheService.del(CACHE_KEYS.ITEMS.BY_ID(id));
    await this.cacheService.del(CACHE_KEYS.ITEMS.ALL);

    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    const result = await this.itemModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    // Invalidate both the specific item cache and the all items cache
    await this.cacheService.del(CACHE_KEYS.ITEMS.BY_ID(id));
    await this.cacheService.del(CACHE_KEYS.ITEMS.ALL);
  }
}
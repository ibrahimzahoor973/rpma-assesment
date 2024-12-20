import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<Item[]> {
    const cachedItems = await this.cacheManager.get<Item[]>('all_items');
    if (cachedItems) {
      return cachedItems;
    }

    const items = await this.itemModel.find().exec();
    await this.cacheManager.set('all_items', items, 300); // Cache for 5 minutes
    return items;
  }

  async findOne(id: string): Promise<Item> {
    const cachedItem = await this.cacheManager.get<Item>(`item_${id}`);
    if (cachedItem) {
      return cachedItem;
    }

    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    await this.cacheManager.set(`item_${id}`, item, 300);
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const updatedItem = await this.itemModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();

    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    await this.cacheManager.del(`item_${id}`);
    await this.cacheManager.del('all_items');

    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    const result = await this.itemModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    await this.cacheManager.del(`item_${id}`);
    await this.cacheManager.del('all_items');
  }
}
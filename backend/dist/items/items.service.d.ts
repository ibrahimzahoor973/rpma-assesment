import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsService {
    private itemModel;
    private cacheManager;
    constructor(itemModel: Model<ItemDocument>, cacheManager: Cache);
    create(createItemDto: CreateItemDto): Promise<Item>;
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<Item>;
    remove(id: string): Promise<void>;
}

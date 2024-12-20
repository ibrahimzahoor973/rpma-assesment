import { Model } from 'mongoose';
import { Item, ItemDocument } from '../schemas/item.schema';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { CacheService } from '@/common/services/cache.service';
export declare class ItemsService {
    private itemModel;
    private cacheService;
    constructor(itemModel: Model<ItemDocument>, cacheService: CacheService);
    create(createItemDto: CreateItemDto): Promise<Item>;
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<Item>;
    remove(id: string): Promise<void>;
}

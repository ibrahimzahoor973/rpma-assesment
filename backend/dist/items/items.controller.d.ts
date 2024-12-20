import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(createItemDto: CreateItemDto): Promise<import("./schemas/item.schema").Item>;
    findAll(): Promise<import("./schemas/item.schema").Item[]>;
    findOne(id: string): Promise<import("./schemas/item.schema").Item>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<import("./schemas/item.schema").Item>;
    remove(id: string): Promise<void>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const item_schema_1 = require("../schemas/item.schema");
const cache_service_1 = require("../../common/services/cache.service");
const cache_keys_constant_1 = require("../../common/constants/cache-keys.constant");
let ItemsService = class ItemsService {
    constructor(itemModel, cacheService) {
        this.itemModel = itemModel;
        this.cacheService = cacheService;
    }
    async create(createItemDto) {
        const createdItem = new this.itemModel(createItemDto);
        const savedItem = await createdItem.save();
        await this.cacheService.del(cache_keys_constant_1.CACHE_KEYS.ITEMS.ALL);
        return savedItem;
    }
    async findAll() {
        try {
            const cachedItems = await this.cacheService.get(cache_keys_constant_1.CACHE_KEYS.ITEMS.ALL);
            if (cachedItems) {
                return cachedItems;
            }
            const items = await this.itemModel.find().exec();
            await this.cacheService.set(cache_keys_constant_1.CACHE_KEYS.ITEMS.ALL, items, cache_keys_constant_1.CACHE_KEYS.TTL.ITEMS);
            console.log('Data successfully saved to Redis.');
            return items;
        }
        catch (error) {
            console.log(error.message, "error");
        }
    }
    async findOne(id) {
        const cacheKey = cache_keys_constant_1.CACHE_KEYS.ITEMS.BY_ID(id);
        const cachedItem = await this.cacheService.get(cacheKey);
        if (cachedItem) {
            return cachedItem;
        }
        const item = await this.itemModel.findById(id).exec();
        if (!item) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        await this.cacheService.set(cacheKey, item, cache_keys_constant_1.CACHE_KEYS.TTL.ITEM_DETAILS);
        return item;
    }
    async update(id, updateItemDto) {
        const updatedItem = await this.itemModel
            .findByIdAndUpdate(id, updateItemDto, { new: true })
            .exec();
        if (!updatedItem) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        await this.cacheService.del(cache_keys_constant_1.CACHE_KEYS.ITEMS.BY_ID(id));
        await this.cacheService.del(cache_keys_constant_1.CACHE_KEYS.ITEMS.ALL);
        return updatedItem;
    }
    async remove(id) {
        const result = await this.itemModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        await this.cacheService.del(cache_keys_constant_1.CACHE_KEYS.ITEMS.BY_ID(id));
        await this.cacheService.del(cache_keys_constant_1.CACHE_KEYS.ITEMS.ALL);
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cache_service_1.CacheService])
], ItemsService);
//# sourceMappingURL=items.service.js.map
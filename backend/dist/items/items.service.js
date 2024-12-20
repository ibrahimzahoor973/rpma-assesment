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
const cache_manager_1 = require("@nestjs/cache-manager");
const item_schema_1 = require("./schemas/item.schema");
let ItemsService = class ItemsService {
    constructor(itemModel, cacheManager) {
        this.itemModel = itemModel;
        this.cacheManager = cacheManager;
    }
    async create(createItemDto) {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }
    async findAll() {
        const cachedItems = await this.cacheManager.get('all_items');
        if (cachedItems) {
            return cachedItems;
        }
        const items = await this.itemModel.find().exec();
        await this.cacheManager.set('all_items', items, 300);
        return items;
    }
    async findOne(id) {
        const cachedItem = await this.cacheManager.get(`item_${id}`);
        if (cachedItem) {
            return cachedItem;
        }
        const item = await this.itemModel.findById(id).exec();
        if (!item) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        await this.cacheManager.set(`item_${id}`, item, 300);
        return item;
    }
    async update(id, updateItemDto) {
        const updatedItem = await this.itemModel
            .findByIdAndUpdate(id, updateItemDto, { new: true })
            .exec();
        if (!updatedItem) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        await this.cacheManager.del(`item_${id}`);
        await this.cacheManager.del('all_items');
        return updatedItem;
    }
    async remove(id) {
        const result = await this.itemModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        await this.cacheManager.del(`item_${id}`);
        await this.cacheManager.del('all_items');
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(item_schema_1.Item.name)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], ItemsService);
//# sourceMappingURL=items.service.js.map
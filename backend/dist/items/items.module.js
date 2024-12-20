"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cache_manager_1 = require("@nestjs/cache-manager");
const items_controller_1 = require("./controllers/items.controller");
const items_service_1 = require("./services/items.service");
const item_schema_1 = require("./schemas/item.schema");
const cache_service_1 = require("../common/services/cache.service");
const redis_config_1 = require("../config/redis.config");
let ItemsModule = class ItemsModule {
};
exports.ItemsModule = ItemsModule;
exports.ItemsModule = ItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: item_schema_1.Item.name, schema: item_schema_1.ItemSchema }]),
            cache_manager_1.CacheModule.register(redis_config_1.redisConfig),
        ],
        controllers: [items_controller_1.ItemsController],
        providers: [items_service_1.ItemsService, cache_service_1.CacheService],
    })
], ItemsModule);
//# sourceMappingURL=items.module.js.map
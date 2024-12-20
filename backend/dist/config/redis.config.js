"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const dotenv = require("dotenv");
dotenv.config();
exports.redisConfig = {
    store: cache_manager_redis_yet_1.redisStore,
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    ttl: parseInt(process.env.CACHE_TTL, 10),
};
//# sourceMappingURL=redis.config.js.map
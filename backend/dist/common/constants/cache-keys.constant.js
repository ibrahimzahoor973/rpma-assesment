"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_KEYS = void 0;
exports.CACHE_KEYS = {
    ITEMS: {
        ALL: 'items:all',
        BY_ID: (id) => `items:${id}`,
    },
    TTL: {
        ITEMS: 300000,
        ITEM_DETAILS: 600000,
    },
};
//# sourceMappingURL=cache-keys.constant.js.map
export const CACHE_KEYS = {
  ITEMS: {
    ALL: 'items:all',
    BY_ID: (id: string) => `items:${id}`,
  },
  TTL: {
    ITEMS: 300000,
    ITEM_DETAILS: 600000,
  },
};
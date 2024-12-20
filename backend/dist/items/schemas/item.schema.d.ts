import { Document } from 'mongoose';
export type ItemDocument = Item & Document;
export declare class Item {
    name: string;
    description: string;
    price: number;
}
export declare const ItemSchema: import("mongoose").Schema<Item, import("mongoose").Model<Item, any, any, any, Document<unknown, any, Item> & Item & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Item, Document<unknown, {}, import("mongoose").FlatRecord<Item>> & import("mongoose").FlatRecord<Item> & {
    _id: import("mongoose").Types.ObjectId;
}>;

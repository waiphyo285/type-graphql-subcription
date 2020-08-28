import { Ref } from "../types";
import { Product } from "./Product";
export declare class Order {
    id: String;
    user_id: String;
    payde: Boolean;
    date: Date;
    products: Ref<Product>;
    _doc: any;
}
export declare const OrderModel: import("@typegoose/typegoose").ReturnModelType<typeof Order, unknown>;

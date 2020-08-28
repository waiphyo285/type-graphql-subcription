import { Ref } from "../types";
import { Product } from "./Product";
export declare class Cart {
    id: string;
    products: Ref<Product>;
    _doc: any;
}
export declare const CartModel: import("@typegoose/typegoose").ReturnModelType<typeof Cart, unknown>;

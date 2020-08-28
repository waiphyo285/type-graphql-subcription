import { Ref } from "../types";
import { Categories } from "./Category";
export declare class Product {
    id: String;
    name: String;
    description: String;
    color: String;
    stock: number;
    price: number;
    category_id: Ref<Categories>;
    _doc: any;
}
export declare const ProductModel: import("@typegoose/typegoose").ReturnModelType<typeof Product, unknown>;
export interface ProductPayload {
    name: String;
}
export declare class ProductArgs {
    recipeId: string;
}

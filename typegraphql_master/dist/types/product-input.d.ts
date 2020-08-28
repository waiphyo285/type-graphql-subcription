import { Product } from "../entities/Product";
import { ObjectId } from "mongodb";
export declare class ProductInput implements Partial<Product> {
    name: String;
    description: String;
    color: String;
    stock: number;
    price: number;
    category_id: ObjectId;
    _doc: any;
}

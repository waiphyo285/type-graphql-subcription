import { Cart } from "../entities/Cart";
import { ObjectId } from "mongodb";
export declare class CartInput implements Partial<Cart> {
    products?: ObjectId;
}

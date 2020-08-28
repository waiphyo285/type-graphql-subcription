import { Ref } from "../types";
import { Cart } from "./Cart";
export declare class User {
    id: number;
    username: String;
    email: String;
    cart_id: Ref<Cart>;
}
export declare const UserModel: import("@typegoose/typegoose").ReturnModelType<typeof User, unknown>;

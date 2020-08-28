import { User } from "../entities/User";
import { ObjectId } from "mongodb";
export declare class UserInput implements Partial<User> {
    username: String;
    email: String;
    cart_id: ObjectId;
}

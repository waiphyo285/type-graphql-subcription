import { Order } from "../entities/Order";
export declare class OrderInput implements Partial<Order> {
    user_id: String;
    payde: Boolean;
    date: Date;
}

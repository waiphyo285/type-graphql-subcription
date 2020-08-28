import { PubSubEngine } from "graphql-subscriptions";
import { Categories, CategoryPayload } from "../entities/Category";
import { CategoriesInput } from "../types/category-input";
export declare class CategoriesResolver {
    returnSingleCategory(id: string): Promise<import("@typegoose/typegoose").DocumentType<Categories> | null>;
    returnAllCategories(): Promise<import("@typegoose/typegoose").DocumentType<Categories>[]>;
    createCategory({ name, description }: CategoriesInput, pubSub: PubSubEngine): Promise<Categories>;
    deleteCategory(id: string): Promise<boolean>;
    newNotification(categoryPayload: CategoryPayload): Categories;
}

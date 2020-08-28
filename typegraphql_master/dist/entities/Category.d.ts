export declare class Categories {
    id: string;
    name: String;
    description: String;
}
export declare const CategoriesModel: import("@typegoose/typegoose").ReturnModelType<typeof Categories, unknown>;
export interface CategoryPayload {
    name: String;
}
export declare class CategoryArgs {
    recipeId: string;
}

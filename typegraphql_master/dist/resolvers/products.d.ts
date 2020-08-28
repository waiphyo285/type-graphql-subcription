import { Product } from "../entities/Product";
import { ProductInput } from "../types/product-input";
import { Categories } from "../entities/Category";
export declare class ProductResolver {
    returnSingleProduct(id: string): Promise<import("@typegoose/typegoose").DocumentType<Product> | null>;
    returnAllProduct(): Promise<import("@typegoose/typegoose").DocumentType<Product>[]>;
    createProduct({ name, description, color, stock, price, category_id, _doc }: ProductInput): Promise<Product>;
    deleteProduct(id: string): Promise<boolean>;
    category(product: Product): Promise<Categories>;
}

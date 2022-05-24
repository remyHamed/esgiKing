import { productDocument, productProps } from "../model";
export declare class Product {
    private static instance?;
    static getInstance(): Product;
    createProduct(product: productProps): Promise<productDocument>;
    getProducts(): Promise<productDocument[]>;
    getById(productId: string): Promise<productDocument>;
    delete(productDeleteId: string): Promise<productDocument>;
}

import {productDocument, ProductModel, productProps} from "../model";


export class ProductController {
    private static instance?: ProductController;
    public static getInstance(): ProductController {
        if(ProductController.instance === undefined) {
            ProductController.instance = new ProductController();
        }
        return ProductController.instance;
    }

    public async createProduct(product: productProps): Promise<productDocument> {
        const model = new ProductModel(product);
        return await model.save();
    }

    public async getProducts(): Promise<productDocument[]> {
        return ProductModel.find();
    }

    async getById(productId: string): Promise<productDocument> {
        const document = await ProductModel.findById(productId);
        if (!document) {
            throw "Product not found";
        }
        return document;
    }

    public async delete(productDeleteId: string): Promise<productDocument> {
        const document = await ProductModel.findOneAndRemove({_id: productDeleteId});
        if (!document) {
            throw "Product not found";
        }
        return document;
    }
}

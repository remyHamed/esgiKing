import {productDocument, ProductModel, productProps, RestaurantDocument, RestaurantModel} from "../model";
import {UserDocument, UserModel, UserProps} from "../model";
import {UserController} from "./"


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
        return ProductModel.find({});
    }

    async getById(productId: string): Promise<productDocument|null> {
        return ProductModel.findById(productId);
    }

    public async delete(productDeleteId: string): Promise<productDocument|null> {
        const productDelete = await this.getById(productDeleteId);
        if (productDelete === null) {
            throw 'Product to delete not found';
        }
        return ProductModel.findOneAndRemove({_id: productDelete._id});
    }
}


import {productDocument, ProductModel, productProps, RestaurantDocument, RestaurantModel} from "../model";
import {UserDocument, UserModel, UserProps} from "../model";
import {UserService} from "../services"


export class ProductService {

    private static instance?: ProductService;

    public static getInstance(): ProductService {

        if(ProductService.instance === undefined) {

            ProductService.instance = new ProductService();

        }

        return ProductService.instance;
    }

    public async createProduct(product: productProps): Promise<productDocument> {

        const model = new ProductModel(product);

        return await model.save();
    }

    public async getPorduccts(): Promise<productDocument[]> {

        return ProductModel.find({});
    }

    async getById(productId: string): Promise<productDocument | null> {

        return ProductModel.findById(productId).exec();

    }

    async update(product: productDocument): Promise<productDocument | null> {

        const filter = {"_id": product._id}

        console.log("step udate filder ", filter,"restaurant" , product);

        return RestaurantModel.findOneAndUpdate(filter,product/*, {rawResult: true}*/);
    }


    public async delete(userId: string,productDeleteId: string): Promise<productDocument|string|null|undefined> {

        const user = await UserService.getInstance().getById(userId);

        if (user === null) {

            throw 'User not found';

        }

        const productDelete = await this.getById(productDeleteId);

        if (productDelete === null) {

            throw 'User to delete not found';

        }

        if (user === undefined)
            throw 'User undefined';


        if (user.role === "admin" ||
            user.id === productDelete.id ||
            user.superUser
        ) {

            return ProductModel.findOneAndRemove({_id: productDelete?._id});

        } else {

            throw "error not allowed";

        }
    }
}


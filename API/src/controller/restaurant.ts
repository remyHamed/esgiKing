import {RestaurantDocument, RestaurantModel, RestaurantProps, UserModel} from "../model";
import {IncorrectArgumentException, ConflictException} from "../lib";

export class RestaurantController {
    private static instance?: RestaurantController;

    public static getInstance(): RestaurantController {
        if (RestaurantController.instance === undefined) {
            RestaurantController.instance = new RestaurantController();
        }
        return RestaurantController.instance;
    }

    public async createRestaurant(restaurant: RestaurantProps): Promise<RestaurantDocument | string> {
        if (!restaurant.address) {
            throw new IncorrectArgumentException("Missing restaurant address");
        } else if (!restaurant.name) {
            throw new IncorrectArgumentException("Missing restaurant name");
        }

        const conflictRestaurant = await RestaurantModel.find({address: restaurant.address});
        if (conflictRestaurant.length) {
            throw new ConflictException("A restaurant with this address already exist");
        }

        return await new RestaurantModel(restaurant).save();
    }

    public async getRestaurants(): Promise<RestaurantDocument[]> {
        return RestaurantModel.find();
    }

    async getById(restaurantId: string): Promise<RestaurantDocument> {
        const document = await RestaurantModel.findById(restaurantId).exec();
        if (!document) {
            throw new IncorrectArgumentException("Restaurant not found");
        }
        return document;
    }

    public async delete(restaurantId: string): Promise<RestaurantDocument> {
        const document = await RestaurantModel.findOneAndRemove({_id: restaurantId});
        if (!document) {
            throw new IncorrectArgumentException("Restaurant not found");
        }
        return document;
    }
}


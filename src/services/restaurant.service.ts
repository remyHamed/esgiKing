import {UserDocument, UserModel, UserProps} from "../model/user.model";
import {RestaurantDocument, RestaurantModel, RestaurantProps} from "../model/restaurant.model";
import {SessionDocument, SessionModel} from "../model/session.model";
import {isValidGPSFomrat} from "../lib/regex";
import {sizeCheck} from "../lib/validator"
import {UserService} from "./user.service";


export class RestaurantService {
    private static instance?: RestaurantService;

    public static getInstance(): RestaurantService {
        if(RestaurantService.instance === undefined) {
            RestaurantService.instance = new RestaurantService();
        }
        return RestaurantService.instance;
    }

    public async createRestaurant(restaurant: RestaurantProps): Promise<RestaurantDocument|string> {

        const model = new RestaurantModel(restaurant);

        if (!isValidGPSFomrat(restaurant.longitude)) {
            throw "Incorrect longitude";
        }

        if (!isValidGPSFomrat(restaurant.latitude)) {
            throw "Incorrect latitude";
        }
        else if (!sizeCheck(restaurant.address)) {
            throw "Incorrect address too long";
        }
        else if (!sizeCheck(restaurant.name)) {
            throw "Incorrect name too long";
        }
        else if (!sizeCheck(restaurant.address)) {
            throw "Incorrect address too long";
        }

        let check = await RestaurantModel.find({zipCode:restaurant.zipCode, num:restaurant.num});

        if(check.length > 0)
            throw "An user with zipCode and num is already registered";

        return await model.save();
    }

    public async getRestaurants(): Promise<RestaurantDocument[]> {

        return RestaurantModel.find({});

    }

    async getById(restaurantId: string): Promise<RestaurantDocument | null> {
        return RestaurantModel.findById(restaurantId).exec();
    }

    public async delete(userId: string,restaurantId: string): Promise<RestaurantDocument|string|null|undefined> {

        const user = await UserService.getInstance().getById(userId);

        if(user === null) {
            return 'User not found';
        }

        const restaurantDelete = await this.getById(restaurantId);

        if (restaurantDelete === null) {

            return 'restaurant to delete not found';

        }

        if (user.superUser) {

            return RestaurantModel.findOneAndRemove({_id: restaurantDelete?._id});

        } else {

            throw "error not allowed";

        }
    }
}


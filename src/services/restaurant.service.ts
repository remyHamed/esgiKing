import {CommandModel, RestaurantDocument, RestaurantModel, RestaurantProps} from "../model";
import {SessionDocument, SessionModel} from "../model/session.model";
import {isValidGPSFomrat} from "../lib";
import {sizeCheck} from "../lib"
import {UserService} from "./user.service";
import {CommandProps} from "../model/command.model";
import {CommandeService} from "./command.service";


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

    async update(restaurant: RestaurantDocument): Promise<RestaurantDocument | null> {

        const filter = {"_id": restaurant._id}

        console.log("step udate filder ", filter,"restaurant" , restaurant);

        return RestaurantModel.findOneAndUpdate(filter,restaurant);
    }

    public async delete(userId: string,restaurantId: string): Promise<RestaurantDocument|string|null|undefined> {

        const user = await UserService.getInstance().getById(userId);

        if(user === null) {
            throw 'User not found';
        }

        const restaurantDelete = await this.getById(restaurantId);

        if (restaurantDelete === null) {

            throw 'restaurant to delete not found';

        }

        if (user.superUser) {

            return RestaurantModel.findOneAndRemove({_id: restaurantDelete?._id});

        } else {

            throw "error not allowed";

        }
    }

    /*public async terminalAddCommand( command: CommandProps, restaurantId: string): Promise<RestaurantDocument |null|string> {

        const restaurant = await RestaurantModel.findById(restaurantId).exec();

        if (restaurant !== null) {

            const commandToAdd = await CommandeService.getInstance().createCommand(command);

            if (commandToAdd === null) {

                throw 'fail save command';

            }
            const restaurantUpdated  = restaurant.commandList.push(commandToAdd.id.toString())

            return this.getInstance().update(restaurantUpdated,restaurantUpdated);

        } else {

            throw 'restaurant not found';

        }

*/
    }


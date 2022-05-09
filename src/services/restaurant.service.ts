import {UserDocument, UserModel, UserProps} from "../model/user.model";
import {RestaurantDocument, RestaurantModel, RestaurantProps} from "../model/restaurant.model";
import {SessionDocument, SessionModel} from "../model/session.model";
import {isValidGPSFomrat} from "../lib/regex";
import {sizeCheck} from "../lib/validator"


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
            throw "Incorrect longitude";
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
        else if (!sizeCheck(restaurant.address)) {
            throw "Incorrect address too long";;
        }

        let check = await UserModel.find({mail:user.mail});

        console.log(check);

        if(check.length > 0)
            throw "An user with this mail is already registered";

        model.password = SecurityUtils.sha512(user.password);
        return await model.save();
    }

    public async getUsers(): Promise<UserDocument[]> {
        return UserModel.find({});
    }

    async getById(userId: string): Promise<UserDocument | null> {
        return UserModel.findById(userId).exec();
    }

    public async logIn(info: {mail: string, password: string}): Promise<SessionDocument> {
        const user = await UserModel.findOne({...info});

        if(!user) {
            throw "Incorrect email or password";
        }

        const date = new Date();

        const session = new SessionModel({
            user: user._id,
            platform: 'insomnia',
            expiration: date.setDate(date.getDate() + 1)
        });

        return await session.save();
    }

    public async delete(userId: string,userDeleteId: string): Promise<UserDocument|string|null|undefined> {

        const user = await this.getById(userId);

        if (user === null) {
            return 'User not found';
        }

        const userDelete = await this.getById(userDeleteId);

        if (userDelete === null) {
            return 'User to delete not found';
        }

        if (user.role === "admin" ||
            user.id === userDelete.id ||
            user.superUser
        ) {
            return UserModel.findOneAndRemove({_id: userDelete?._id});
        } else {
            throw "error not allowed";
        }
    }
}


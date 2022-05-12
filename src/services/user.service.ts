import {UserDocument, UserModel, UserProps} from "../model/user.model";
import {SessionDocument, SessionModel} from "../model/session.model";
import {isValidEmail, isValidName, isValidPassword, isValidRole} from "../lib/regex";
import {SecurityUtils} from "../lib/security";
import {RestaurantDocument, RestaurantModel, RestaurantProps} from "../model";

export class UserService {
    private static instance?: UserService;

    public static getInstance(): UserService {
        if(UserService.instance === undefined) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async createUser(user: UserProps): Promise<UserDocument> { //TODO bloquer la creation de super User en aurisant la création que d'un seul
        const model = new UserModel(user);

        if (!isValidRole(user.role)) {
            throw "Incorrect role";
        }
        else if (!isValidEmail(user.mail)) {
            throw "Incorrect email format";
        }
        else if (!isValidPassword(user.password)) {
            throw "Incorrect password format";
        }
        else if (!isValidName(user.firstName)) {
            throw "Incorrect first name format";
        }
        else if (!isValidName(user.lastName)) {
            throw "Incorrect last name format";
        }

        let check = await UserModel.find({mail:user.mail});

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

    public async logInTerminal(info: {mail: string, password: string}): Promise<SessionDocument> {

        const user = await UserModel.findOne({...info});

        if(!user) {
            throw "Incorrect email or password";
        }
        if(user.role === "admin" || user.superUser) {

            const date = new Date();

            const session = new SessionModel({
                user: user._id,
                platform: 'terminal',
                expiration: date.setDate(date.getDate() + 1)
            });

            return await session.save();

        } else {

            throw "Incorrect not allowed";
        }
    }

    public async delete(userId: string,userDeleteId: string): Promise<UserDocument|string|null|undefined> {

        const user = await this.getById(userId);

        if (user === null) {
            throw 'User not found';
        }

        const userDelete = await this.getById(userDeleteId);

        if (userDelete === null) {
            throw 'User to delete not found';
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


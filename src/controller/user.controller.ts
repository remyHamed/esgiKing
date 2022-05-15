import {UserDocument, UserModel, UserProps} from "../model";
import {SessionDocument, SessionModel} from "../model/session.model";
import {isValidEmail, isValidName, isValidPassword, isValidRole} from "../lib/regex";
import {SecurityUtils} from "../lib/security";

export class UserController {
    private static instance?: UserController;

    public static getInstance(): UserController {
        if(UserController.instance === undefined) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    public async createUser(user: UserProps): Promise<UserDocument> {
        if (!isValidRole(user.role)) {
            throw "Incorrect role";
        }else if (!isValidEmail(user.mail)) {
            throw "Incorrect email format";
        }else if (!isValidPassword(user.password)) {
            throw "Incorrect password format";
        }else if (!isValidName(user.firstName)) {
            throw "Incorrect first name format";
        }else if (!isValidName(user.lastName)) {
            throw "Incorrect last name format";
        }else if(await UserModel.find({mail:user.mail}))
            throw "An user with this mail is already exist";

        user.password = SecurityUtils.sha512(user.password)
        const model =  new UserModel(user);
        return await model.save();
    }

    public async getUsers(): Promise<UserDocument[]> {
        return UserModel.find();
    }

    async getById(userId: string): Promise<UserDocument> {
        const document = await UserModel.findById(userId).exec();
        if (!document) {
            throw "User not found";
        }
        return document;
    }

    public async logIn(info: {mail: string, password: string}): Promise<SessionDocument> {
        const user = await UserModel.findOne(info);
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

    public async delete(userId: string): Promise<UserDocument> {
        const document = await UserModel.findOneAndRemove({_id: userId});
        if (!document) {
            throw "User not found";
        }
        return document;
    }
}


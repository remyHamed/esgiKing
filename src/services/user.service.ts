import {UserDocument, UserModel, UserProps} from "../model/user.model";
import {SessionDocument, SessionModel} from "../model/session.model";
import {isValidEmail, isValidPassword} from "../lib/regex";

export class UserService {
    private static instance?: UserService;

    public static getInstance(): UserService {
        if(UserService.instance === undefined) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async createUser(user: UserProps): Promise<UserDocument> {
        const model = new UserModel(user);

        if (!isValidEmail(user.mail)) {
            throw "Incorrect email format";
        }
        else if (!isValidPassword(user.password)) {
            throw "Incorrect password format";
        }

        return await model.save();
    }

    public async getUsers(): Promise<UserDocument[]> {
        return UserModel.find({});
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
            expiration: date.setDate(date.getDate()+1)
        });

        return await session.save();
    }
}

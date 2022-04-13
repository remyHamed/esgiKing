import {UserDocument, UserModel, UserProps} from "../model/user.model";
import {SessionModel} from "../model/session.model";

export class UserService {
    private static instance?: UserService;

    public static getInstance(): UserService {
        if(UserService.instance === undefined) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async createUser(props: UserProps): Promise<UserDocument> {
        const model = new UserModel(props);
        return await model.save();
    }

    public async getUsers(): Promise<UserDocument[]> {
        return UserModel.find({});
    }

    public async logIn(info: {mail: string, password: string}): Promise<any> {
        const user = await UserModel.findOne({...info});
        if(!user) {
            throw Error("Mail or Password is wrong");
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

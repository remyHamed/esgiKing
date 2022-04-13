import {UserDocument, UserModel, UserProps} from "../model/user.model";

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
}

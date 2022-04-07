import {UserDocument, UserModel, UserProps} from "../model/user.model";

export class UserService {
    private static instance?: UserService;
    public static getInstance(): UserService {
        if(UserService.instance === undefined) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    private constructor() { }

    public async createUser(props: UserProps): Promise<UserDocument> {
        const model = new UserModel(props);
        const user = await model.save();
        return user;
    }
}

import {UserDocument, UserModel, UserProps} from "../model/user.model";
import {SessionDocument, SessionModel} from "../model/session.model";
import {isValidEmail, isValidName, isValidPassword, isValidRole} from "../lib/regex";
import {SecurityUtils} from "../lib/security";

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
            user.superUser === true
        ) {
            UserModel.findOneAndRemove({_id: userDelete?._id})
                .exec(function (err, item:UserDocument) {
                    if (err) {
                        throw err;
                    }
                    if (!item) {
                        return 'User not found';
                    }
                    return item;
                });
        } else {
            throw "error not allowed";
        }
    }
}
       // const nbdelete = UserModel.deleteOne({_id: userDelete?._id});

     //   const check = await this.getById(userDeleteId);

    // console.log("nbdelete correspond à ", nbdelete);

    //console.log("check correspond à ", check);

    // if( nbdelete === 1 && check === null ) {
    //       return userDelete;
    // } else {
      //      throw "error not delete"
    //   }
       // let result = await UserModel.findOneAndDelete();
       // console.log("resultat du delete" , result);
       // return user;


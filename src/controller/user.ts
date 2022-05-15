import {UserDocument, UserModel, UserProps} from "../model";
import {SessionDocument, SessionModel} from "../model/session";
import {isValidEmail, isValidName, isValidPassword, isValidRole} from "../lib/regex";
import {SecurityUtils} from "../lib/security";
import {ConflictException, IncorrectArgumentException, NotFoundException} from "../lib";

export class UserController {
    private static instance?: UserController;

    public static getInstance(): UserController {
        if (UserController.instance === undefined) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    public async createUser(user: UserProps): Promise<UserDocument> {
        if (!isValidRole(user.role)) {
            throw new IncorrectArgumentException("Incorrect role");
        } else if (!isValidEmail(user.mail)) {
            throw new IncorrectArgumentException("Incorrect email format");
        } else if (!isValidPassword(user.password)) {
            throw new IncorrectArgumentException("Incorrect password format");
        } else if (!isValidName(user.firstName)) {
            throw new IncorrectArgumentException("Incorrect first name format");
        } else if (!isValidName(user.lastName)) {
            throw new IncorrectArgumentException("Incorrect last name format");
        }

        const conflictUser = await UserModel.find({mail: user.mail});
        if (conflictUser.length)
            throw new ConflictException("An user with this mail already exist");

        return await new UserModel({
            ...user,
            superUser:false,
            password:SecurityUtils.sha512(user.password)},
        ).save();
    }

    public async getUsers(): Promise<UserDocument[]> {
        return UserModel.find();
    }

    async getById(userId: string): Promise<UserDocument> {
        const document = await UserModel.findById(userId);
        if (!document) {
            throw new NotFoundException("User not found");
        }
        return document;
    }

    public async logIn(info: { mail: string, password: string }): Promise<SessionDocument> {
        const user = await UserModel.findOne(info);
        if (!user) {
            throw new IncorrectArgumentException("Incorrect email or password");
        }

        const date = new Date();
        const session = new SessionModel({
            user: user._id,
            expiration: date.setDate(date.getDate() + 1)
        });
        return await session.save();
    }

    public async delete(userId: string): Promise<void> {
        const document = await UserModel.findOneAndRemove({_id: userId});
        if (!document) {
            throw new NotFoundException("User not found");
        }
    }
}


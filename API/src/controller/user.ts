import {UserDocument, UserModel, UserProps} from "../model";
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

    //comment
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
            mail:user.mail.toLowerCase(),
            password:SecurityUtils.sha512(user.password)
        }).save();
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

    public async delete(userId: string): Promise<void> {
        const document = await UserModel.findOneAndRemove({_id: userId});
        if (!document) {
            throw new NotFoundException("User not found");
        }
    }

    static async getLocation(): Promise<any>{
        const axios = require("axios");

        const params = {
            considerIp: true
        };

        const sendPostRequest = async () => {
            try {
                const resp = await axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDBg7jMC7RfjtyIesm9JhNwkXYpfwsbARk', params);
                // console.log(resp.data);
                return resp.data;
            } catch (err) {
                return err;
            }
        };

        return sendPostRequest();
    }
}


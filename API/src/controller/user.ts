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

        const options = {
            method: 'GET',
            url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
            headers: {
                'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
                'X-RapidAPI-Key': '5d6e2ec060mshcc8fb959d7387d8p1f47dfjsnf8a8175763bd'
            }
        };

        axios.request(options).then(function (response: any) {
            return response
        }).catch(function (error: any) {
            return error
        });
    }
}


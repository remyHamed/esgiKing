import {UserModel} from "../model";
import {AuthDocument, AuthModel} from "../model/auth";
import {NotFoundException, SecurityUtils} from "../lib";

export class AuthController {
    private static instance?: AuthController;

    public static getInstance(): AuthController {
        if (AuthController.instance === undefined) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    public async logIn(info: { mail: string, password: string }): Promise<AuthDocument> {
        const user = await UserModel.findOne({
            mail:info.mail,
            password:SecurityUtils.sha512(info.password)
        });
        if (!user) {
            throw new NotFoundException("No user with this email or password has been found");
        }

        const date = new Date();
        const session = new AuthModel({
            user: user._id,
            expiration: date.setDate(date.getDate() + 1)
        });
        return await session.save();
    }
}

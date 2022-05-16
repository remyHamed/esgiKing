import {UserModel} from "../model";
import {AuthDocument, AuthModel} from "../model/auth";
import {ExpiredException, NotFoundException, SecurityUtils} from "../lib";

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

    public async getAuthByToken(token: string): Promise<AuthDocument> {
        const auth = await AuthModel.findById(token);
        if (!auth) {
            throw new NotFoundException("No session found with this token");
        } else if (!auth.expiration || auth.expiration <= new Date()) {
            await auth.remove();
            throw new ExpiredException("The session related to this token is expired");
        }
        return auth;
    }
}

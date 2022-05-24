import * as crypto from "crypto";
import {AuthModel} from "../model/auth";
import {ExpiredException, UnauthorizedException} from "./exception";
import {UserModel} from "../model";

export class SecurityUtils {
    public static sha512(str: string): string {
        const hash = crypto.createHash('sha512');
        hash.update(str);
        return hash.digest("hex");
    }
}

export const getTokenRole = async (token: string) => {
    const auth = await AuthModel.findById(token);
    if (!auth) {
        throw new UnauthorizedException("No session found with this token");
    } else if (!auth.expiration || auth.expiration <= new Date()) {
        await auth.remove();
        throw new ExpiredException("The session related to this token is expired");
    }

    const user = await UserModel.findById(auth.user);
    if (!user) {
        await auth.remove();
        throw new UnauthorizedException("No user found with this token");
    }

    return user.role;
}

export const checkSpecificAuthor = async (token: string | undefined, role: string) => {
    if (!token || await getTokenRole(token) !== role){
        throw new UnauthorizedException(`The user related to this token isn't ${role}`);
    }
}
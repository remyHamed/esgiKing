import { AuthDocument } from "../model/auth";
export declare class AuthController {
    private static instance?;
    static getInstance(): AuthController;
    logIn(info: {
        mail: string;
        password: string;
    }): Promise<AuthDocument>;
}

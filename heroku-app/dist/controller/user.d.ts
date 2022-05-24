import { UserDocument, UserProps } from "../model";
export declare class UserController {
    private static instance?;
    static getInstance(): UserController;
    createUser(user: UserProps): Promise<UserDocument>;
    getUsers(): Promise<UserDocument[]>;
    getById(userId: string): Promise<UserDocument>;
    delete(userId: string): Promise<void>;
    static getLocation(): Promise<any>;
}

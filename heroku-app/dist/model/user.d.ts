import { Document, Model } from "mongoose";
export interface UserProps {
    role: string;
    firstName: string;
    lastName: string;
    mail: string;
    password: string;
}
export declare type UserDocument = UserProps & Document;
export declare const UserModel: Model<UserDocument>;

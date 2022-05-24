import { Model } from "mongoose";
import { UserProps } from "./user";
export interface AuthProps {
    _id: string;
    user: string | UserProps;
    expiration?: Date;
}
export declare type AuthDocument = AuthProps & Document;
export declare const AuthModel: Model<AuthDocument>;

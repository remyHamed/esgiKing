import mongoose, {Model, Schema} from "mongoose";
import {UserProps} from "./user";

const authSchema = new Schema({
    user: {
        type: Schema.Types.String,
        required: true,
        ref: "User"
    },
    expiration: {
        type: Schema.Types.Date
    }
}, {
    collection: "sessions",
    timestamps: true,
    versionKey: false
});

export interface AuthProps {
    _id: string,
    user: string | UserProps,
    expiration?: Date,
}

export type AuthDocument = AuthProps & Document;
export const AuthModel: Model<AuthDocument> = mongoose.model<AuthDocument>("Auth", authSchema);
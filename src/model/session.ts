import mongoose, {Model, Schema} from "mongoose";
import {UserProps} from "./user";

const sessionSchema = new Schema({
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

export interface SessionProps {
    _id: string,
    user: string | UserProps,
    expiration?: Date,
}

export type SessionDocument = SessionProps & Document;
export const SessionModel: Model<SessionDocument> = mongoose.model<SessionDocument>("Session", sessionSchema);
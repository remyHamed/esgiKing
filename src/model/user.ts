import mongoose, {Schema, Document, Model} from "mongoose";

const userSchema = new Schema({
    superUser: {
        type: Schema.Types.Boolean,
        required: true
    },
    role: {
        type: Schema.Types.String,
        required: true
    },
    firstName: {
        type: Schema.Types.String,
        required: true
    },
    lastName: {
        type: Schema.Types.String,
        required: true
    },
    mail: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    }
}, {
    collection: "users",
    timestamps: true,
    versionKey: false
});

export interface UserProps {
    role: string,
    firstName: string,
    lastName: string,
    mail: string,
    password: string,
    superUser: boolean
}

export type UserDocument = UserProps & Document;
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);
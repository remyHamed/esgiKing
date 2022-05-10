import mongoose, {Schema, Document, Model} from "mongoose";


const commandsSchema = new Schema({
    productList: {
        type: Schema.Types.String,
        required: true
    },
    menuList: {
    type: Schema.Types.String,
        required: true
    },
    total: {
        type: Schema.Types.Number,
        required: true
    },
    payed: {
        type: Schema.Types.String,
        required: true
    },
    restaurant: {
        type: Schema.Types.String,
        required: true
    }
}, {
    collection: "commands",
    timestamps: true,
    versionKey: false
});

export interface CommandProps {
    productList: string,
    menuList: string,
    total: number,
    payed: boolean
}

export type CommandDocument = CommandProps & Document;
export const CommandModel: Model<CommandDocument> = mongoose.model<CommandDocument>("Restaurant", commandsSchema);
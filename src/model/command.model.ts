import mongoose, {Schema, Document, Model} from "mongoose";


const commandsSchema = new Schema({
    productList: {
        type: [String],
        required: true
    },
    menuList: {
    type: [String],
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
    restaurantId: {
        type: Schema.Types.String,
        required: true
    },
    author: {
        type: Schema.Types.String,
        required: true
    }
}, {
    collection: "commands",
    timestamps: true,
    versionKey: false,
});

export interface CommandProps {
    productList:  [string],
    menuList:  [string],
    total: number,
    payed: boolean,
    author: string,
    restaurantId: string
}

export type CommandDocument = CommandProps & Document;
export const CommandModel: Model<CommandDocument> = mongoose.model<CommandDocument>("Command", commandsSchema);
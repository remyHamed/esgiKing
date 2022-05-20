import mongoose, {Schema, Document, Model} from "mongoose";


const commandsSchema = new Schema({
    productList: {
        type: [{ type: String }],
        required: true
    },
    settled: {
        type: Schema.Types.String,
        required: true
    },
    restaurant: [{
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }],
    client: {
        type: Schema.Types.String,
        required: true
    }
}, {
    collection: "commands",
    timestamps: true,
    versionKey: false,
});

export interface CommandProps {
    productList: [string],
    settled: boolean,
    client: string,
    restaurant: string
}

export type CommandDocument = CommandProps & Document;
export const CommandModel: Model<CommandDocument> = mongoose.model<CommandDocument>("Command", commandsSchema);
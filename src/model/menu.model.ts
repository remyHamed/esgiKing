import mongoose, {Schema, Document, Model} from "mongoose";

const menuSchema = new Schema({

    name: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    productList: {
        type: Schema.Types.String,
        required: true
    }
}, {
    collection: "menus",
    timestamps: true,
    versionKey: false
});

export interface menuProps {
    name: string,
    price: number,
    productList:
}

export type MenuDocument = MenuProps & Document;
export const MenuModel: Model<MenuDocument> = mongoose.model<MenuDocument>("Restaurant", menuSchema);
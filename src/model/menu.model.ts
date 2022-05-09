import mongoose, {Schema, Document, Model} from "mongoose";
import {productDocument} from "./product.model";

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

export interface MenuProps {
    name: string,
    price: number,
    productList: string | Array<productDocument>
}

export type MenuDocument = MenuProps & Document;
export const MenuModel: Model<MenuDocument> = mongoose.model<MenuDocument>("Restaurant", menuSchema);
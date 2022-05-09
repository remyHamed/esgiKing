/*import mongoose, {Schema, Document, Model} from "mongoose";
import {productDocument} from "./product.model";
import {MenuModel} from "./menu.model";

const commandsSchema = new Schema({

    productList: {
        type: Schema.Types.DocumentArray,
        required: true
    },
    menuList: {
    type: MenuModel,
        required: true
    },
    total: {
        type: Schema.Types.Number,
        required: true
    }
}, {
    collection: "commands",
    timestamps: true,
    versionKey: false
});

export interface CommandProps {
    productList: Array<productDocument>,
    menuList: Array<MenuDocument>,
    total: number |
}

export type MenuDocument = MenuProps & Document;
export const MenuModel: Model<MenuDocument> = mongoose.model<MenuDocument>("Restaurant", menuSchema);*/
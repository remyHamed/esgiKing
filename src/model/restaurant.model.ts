import mongoose, {Schema, Document, Model} from "mongoose";
import {MenuDocument} from "./menu.model";

const restaurantSchema = new Schema({

    address: {
        type: Schema.Types.String,
        required: true
    },
    longitude: {
        type: Schema.Types.String,
        required: true
    },
    latitude: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    menuList: {
        type: Schema.Types.String,
        required: true
    },
    commandList: {
        type: Schema.Types.String,
        required: true
    }
}, {
    collection: "restaurants",
    timestamps: true,
    versionKey: false
});

export interface RestaurantProps {
    address: string,
    longitude: string,
    latitude: string,
    name: string,
    price: number,
    menuList: string | Array<MenuDocument> ,
    commandList: string | Array<MenuDocument>
}

export type RestaurantDocument = RestaurantProps & Document;
export const RestaurantModel: Model<RestaurantDocument> = mongoose.model<RestaurantDocument>("Restaurant", restaurantSchema);
import mongoose, {Schema, Document, Model} from "mongoose";
import {MenuDocument, MenuProps} from "./menu.model";

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
    menuList: {
        type: [String],
        required: true
    },
    commandList: {
        type: [String],
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
    menuList: string | Array<MenuProps> ,
    commandList: string | Array<MenuProps>
}

export type RestaurantDocument = RestaurantProps & Document;
export const RestaurantModel: Model<RestaurantDocument> = mongoose.model<RestaurantDocument>("Restaurant", restaurantSchema);
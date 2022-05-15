import mongoose, {Schema, Document, Model} from "mongoose";
<<<<<<< HEAD
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
=======

const restaurantSchema = new Schema({
>>>>>>> b70677cfd567f51b0f1fa797ce38050abb5ea50e
    name: {
        type: Schema.Types.String,
        required: true
    },
<<<<<<< HEAD
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
=======
    location: {
        type: Schema.Types.String,
        required: true
    },
    ingredientStocks: [{
        product:{type:Schema.Types.String},
        quantity:{type:Schema.Types.Number}
    }]
})

export interface RestaurantProps {
    name: string,
    ingredients: string[]
>>>>>>> b70677cfd567f51b0f1fa797ce38050abb5ea50e
}

export type RestaurantDocument = RestaurantProps & Document;
export const RestaurantModel: Model<RestaurantDocument> = mongoose.model<RestaurantDocument>("Restaurant", restaurantSchema);
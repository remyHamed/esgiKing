import mongoose, {Schema, Document, Model} from "mongoose";

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
    latitude:string,
    name:string,
    price: number,
    menuList:,
    commandList:
}

export type RestaurantDocument = RestaurantProps & Document;
export const UserModel: Model<RestaurantDocument> = mongoose.model<RestaurantDocument>("Restaurant", restaurantSchema);
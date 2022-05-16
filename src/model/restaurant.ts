import mongoose, {Schema, Document, Model} from "mongoose";


const restaurantSchema = new Schema({
    address: {
        type: Schema.Types.String,
        required: true
    },
    name: {
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
    name: string
}

export type RestaurantDocument = RestaurantProps & Document;
export const RestaurantModel: Model<RestaurantDocument> = mongoose.model<RestaurantDocument>("Restaurant", restaurantSchema);
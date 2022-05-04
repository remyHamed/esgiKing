import mongoose, {Schema, Document, Model} from "mongoose";

const restaurantSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
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
}

export type RestaurantDocument = RestaurantProps & Document;
export const RestaurantModel: Model<RestaurantDocument> = mongoose.model<RestaurantDocument>("Restaurant", restaurantSchema);
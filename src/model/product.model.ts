import mongoose, {Schema, Document, Model} from "mongoose";

const productSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    }
}, {
    collection: " products",
    timestamps: true,
    versionKey: false
});

export interface  productProps {
    name: string,
    price: number
}

export type productDocument = productProps & Document;
export const ProductModel: Model<productDocument> = mongoose.model<productDocument>("Product", productSchema);
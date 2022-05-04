import mongoose, {Schema, Document, Model} from "mongoose";

const productSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    ingredients: {
        type: [Schema.Types.String],
        required: true
    }
})

export interface ProductProps {
    name: string,
    ingredients: string[]
}

export type ProductDocument = ProductProps & Document;
export const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>("Product", productSchema);
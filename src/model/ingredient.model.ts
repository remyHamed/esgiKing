import mongoose, {Schema, Document, Model} from "mongoose";

const ingredientSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    }
})

export interface IngredientProps {
    name: string
}

export type IngredientDocument = IngredientProps & Document;
export const IngredientModel: Model<IngredientDocument> = mongoose.model<IngredientDocument>("Ingredient", ingredientSchema);
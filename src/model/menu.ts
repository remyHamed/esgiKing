import mongoose, {Schema, Document, Model} from "mongoose";

const menuSchema = new Schema({

    name: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    productList: {
        type: [{ type: String }],
        required: true
    },
    ready: {
        type: Schema.Types.Boolean,
        required: true
    }
}, {
    collection: "menus",
    timestamps: true,
    versionKey: false
});

export interface MenuProps {
    name: string,
    price: number,
    productList: [string],
    ready: boolean
}

export type MenuDocument = MenuProps & Document;
export const MenuModel: Model<MenuDocument> = mongoose.model<MenuDocument>("Menu", menuSchema);
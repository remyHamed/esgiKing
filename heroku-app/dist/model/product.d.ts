import { Document, Model } from "mongoose";
export interface productProps {
    name: string;
    price: number;
}
export declare type productDocument = productProps & Document;
export declare const ProductModel: Model<productDocument>;

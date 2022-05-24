import { Document, Model } from "mongoose";
export interface RestaurantProps {
    address: string;
    name: string;
}
export declare type RestaurantDocument = RestaurantProps & Document;
export declare const RestaurantModel: Model<RestaurantDocument>;

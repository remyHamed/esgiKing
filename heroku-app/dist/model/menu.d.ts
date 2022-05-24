import { Document, Model } from "mongoose";
export interface MenuProps {
    name: string;
    price: number;
    productList: [string];
    ready: boolean;
}
export declare type MenuDocument = MenuProps & Document;
export declare const MenuModel: Model<MenuDocument>;

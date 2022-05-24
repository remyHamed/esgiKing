import { Document, Model } from "mongoose";
export interface CommandProps {
    productList: [string];
    settled: boolean;
    client: string;
    restaurant: string;
}
export declare type CommandDocument = CommandProps & Document;
export declare const CommandModel: Model<CommandDocument>;

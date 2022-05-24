import { RestaurantDocument, RestaurantProps } from "../model";
export declare class RestaurantController {
    private static instance?;
    static getInstance(): RestaurantController;
    createRestaurant(restaurant: RestaurantProps): Promise<RestaurantDocument | string>;
    getRestaurants(): Promise<RestaurantDocument[]>;
    getById(restaurantId: string): Promise<RestaurantDocument>;
    delete(restaurantId: string): Promise<RestaurantDocument>;
}

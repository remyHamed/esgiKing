import express from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import userRoute from "./routes/user.route";
import {UserModel} from "./model/user.model";
import RestaurantRoute from "./routes/restaurant.route";
import ProductRoute from "./routes/product.route";
config();

async function bootstrap(): Promise<void> {
    // Express init
    const app = express();

    // MongoDB connection
    mongoose.connect(process.env.MONGO_URI as string, {
        auth: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD
        }
    });

    // TODO create admin(super user)

    // Routes additions
    app.use('/user', userRoute);
    app.use('/restaurant', RestaurantRoute);
    app.use('/product', ProductRoute);

    const listEndpoints = require("express-list-endpoints"); // npm i express-list-endpoints
console.log(listEndpoints(app));
    

    // Port Listening
    app.listen(process.env.PORT, function() {
        console.log("Server listening on port " + process.env.PORT);
    });
}

bootstrap().catch(console.error);
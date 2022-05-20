import express from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import userRoute from "./services/user";
import authRoute from "./services/auth";
import {UserModel} from "./model";
import {SecurityUtils} from "./lib";
import commandRoute from "./services/command";
import productRoute from "./services/product";
config();

async function bootstrap(): Promise<void> {
    // Express init
    const app = express();
    const path = require('path');

    // Ajout des HEADERS CORS
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/', function(req, res, next) {
        // Handle the get for this route
    });

    app.post('/', function(req, res, next) {
        // Handle the post for this route
    });

    // MongoDB connection
    mongoose.connect(process.env.MONGO_URI as string, {
        auth: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD
        }
    });

    // Superuser creation
    const passwordSuperuser = process.env.SUPERUSER_PASSWORD ? process.env.SUPERUSER_PASSWORD : "AdminP@ssw0rd";
    const adminProps = {
        role: "bigBoss",
        firstName: "Enzo",
        lastName: "Soares",
        mail: "enzo.soares@esgiking.fr",
        password: SecurityUtils.sha512(passwordSuperuser)
    }

    const superUser = await UserModel.find(adminProps);
    if (!superUser.length) {
        await new UserModel(adminProps).save();
    }

    // Routes additions
    app.use('/user', userRoute);
    app.use('/auth', authRoute);
    app.use('/command', commandRoute);
    app.use('/product', productRoute)

    // Port Listening
    app.listen(process.env.PORT, function() {
        console.log("Server listening on port " + process.env.PORT);
    });
}

bootstrap().catch(console.error);
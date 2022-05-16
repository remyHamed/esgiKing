import express from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import userRoute from "./services/user";
import authRoute from "./services/auth";
import {UserModel} from "./model";
import {SecurityUtils} from "./lib";
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

    // Superuser creation
    const passwordSuperuser = process.env.SUPERUSER_PASSWORD ? process.env.SUPERUSER_PASSWORD : "AdminP@ssw0rd";
    const adminProps = {
        role: "admin",
        firstName: "Enzo",
        lastName: "Soares",
        mail: "superadmin@esgiking.fr",
        password: SecurityUtils.sha512(passwordSuperuser),
        superUser: true
    }

    const superUser = await UserModel.find(adminProps);
    if (!superUser.length) {
        await new UserModel(adminProps).save();
    }

    // Routes additions
    app.use('/user', userRoute);
    app.use('/auth', authRoute);

    // Port Listening
    app.listen(process.env.PORT, function() {
        console.log("Server listening on port " + process.env.PORT);
    });
}

bootstrap().catch(console.error);
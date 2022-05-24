"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const user_1 = __importDefault(require("./services/user"));
const auth_1 = __importDefault(require("./services/auth"));
const model_1 = require("./model");
const lib_1 = require("./lib");
const command_1 = __importDefault(require("./services/command"));
const product_1 = __importDefault(require("./services/product"));
const restaurant_1 = __importDefault(require("./services/restaurant"));
(0, dotenv_1.config)();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // Express init
        const app = (0, express_1.default)();
        const path = require('path');
        // Ajout des HEADERS CORS
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.get('/', function (req, res, next) {
            // Handle the get for this route
        });
        app.post('/', function (req, res, next) {
            // Handle the post for this route
        });
        // MongoDB connection
        mongoose_1.default.connect(process.env.MONGO_URI, {
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
            password: lib_1.SecurityUtils.sha512(passwordSuperuser)
        };
        const superUser = yield model_1.UserModel.find(adminProps);
        if (!superUser.length) {
            yield new model_1.UserModel(adminProps).save();
        }
        // Routes additions
        app.use('/user', user_1.default);
        app.use('/auth', auth_1.default);
        app.use('/command', command_1.default);
        app.use('/product', product_1.default);
        app.use('/restaurant', restaurant_1.default);
        // Port Listening
        app.listen(process.env.PORT, function () {
            console.log("Server listening on port " + process.env.PORT);
        });
    });
}
bootstrap().catch(console.error);
//# sourceMappingURL=index.js.map
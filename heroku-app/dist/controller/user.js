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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const model_1 = require("../model");
const regex_1 = require("../lib/regex");
const security_1 = require("../lib/security");
const lib_1 = require("../lib");
class UserController {
    static getInstance() {
        if (UserController.instance === undefined) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }
    //comment
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, regex_1.isValidRole)(user.role)) {
                throw new lib_1.IncorrectArgumentException("Incorrect role");
            }
            else if (!(0, regex_1.isValidEmail)(user.mail)) {
                throw new lib_1.IncorrectArgumentException("Incorrect email format");
            }
            else if (!(0, regex_1.isValidPassword)(user.password)) {
                throw new lib_1.IncorrectArgumentException("Incorrect password format");
            }
            else if (!(0, regex_1.isValidName)(user.firstName)) {
                throw new lib_1.IncorrectArgumentException("Incorrect first name format");
            }
            else if (!(0, regex_1.isValidName)(user.lastName)) {
                throw new lib_1.IncorrectArgumentException("Incorrect last name format");
            }
            const conflictUser = yield model_1.UserModel.find({ mail: user.mail });
            if (conflictUser.length)
                throw new lib_1.ConflictException("An user with this mail already exist");
            return yield new model_1.UserModel(Object.assign(Object.assign({}, user), { mail: user.mail.toLowerCase(), password: security_1.SecurityUtils.sha512(user.password) })).save();
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.UserModel.find();
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield model_1.UserModel.findById(userId);
            if (!document) {
                throw new lib_1.NotFoundException("User not found");
            }
            return document;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield model_1.UserModel.findOneAndRemove({ _id: userId });
            if (!document) {
                throw new lib_1.NotFoundException("User not found");
            }
        });
    }
    static getLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const axios = require("axios");
            const params = {
                considerIp: true
            };
            const sendPostRequest = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const resp = yield axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDBg7jMC7RfjtyIesm9JhNwkXYpfwsbARk', params);
                    // console.log(resp.data);
                    return resp.data;
                }
                catch (err) {
                    return err;
                }
            });
            return sendPostRequest();
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map
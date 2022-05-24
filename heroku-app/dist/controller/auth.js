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
exports.AuthController = void 0;
const model_1 = require("../model");
const auth_1 = require("../model/auth");
const lib_1 = require("../lib");
class AuthController {
    static getInstance() {
        if (AuthController.instance === undefined) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }
    logIn(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.UserModel.findOne({
                mail: info.mail,
                password: lib_1.SecurityUtils.sha512(info.password)
            });
            if (!user) {
                throw new lib_1.NotFoundException("No user with this email or password has been found");
            }
            const date = new Date();
            const session = new auth_1.AuthModel({
                user: user._id,
                expiration: date.setDate(date.getDate() + 1)
            });
            return yield session.save();
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkSpecificAuthor = exports.getTokenRole = exports.SecurityUtils = void 0;
const crypto = __importStar(require("crypto"));
const auth_1 = require("../model/auth");
const exception_1 = require("./exception");
const model_1 = require("../model");
class SecurityUtils {
    static sha512(str) {
        const hash = crypto.createHash('sha512');
        hash.update(str);
        return hash.digest("hex");
    }
}
exports.SecurityUtils = SecurityUtils;
const getTokenRole = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield auth_1.AuthModel.findById(token);
    if (!auth) {
        throw new exception_1.UnauthorizedException("No session found with this token");
    }
    else if (!auth.expiration || auth.expiration <= new Date()) {
        yield auth.remove();
        throw new exception_1.ExpiredException("The session related to this token is expired");
    }
    const user = yield model_1.UserModel.findById(auth.user);
    if (!user) {
        yield auth.remove();
        throw new exception_1.UnauthorizedException("No user found with this token");
    }
    return user.role;
});
exports.getTokenRole = getTokenRole;
const checkSpecificAuthor = (token, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token || (yield (0, exports.getTokenRole)(token)) !== role) {
        throw new exception_1.UnauthorizedException(`The user related to this token isn't ${role}`);
    }
});
exports.checkSpecificAuthor = checkSpecificAuthor;
//# sourceMappingURL=security.js.map
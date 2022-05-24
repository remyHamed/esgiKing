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
const express_1 = __importStar(require("express"));
const http_status_codes_1 = require("http-status-codes");
const controller_1 = require("../controller");
const lib_1 = require("../lib");
const restaurantRoute = (0, express_1.Router)();
restaurantRoute.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(http_status_codes_1.StatusCodes.OK).json(yield controller_1.RestaurantController.getInstance().getRestaurants());
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}))
    .post(express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, lib_1.checkSpecificAuthor)(req.headers['authorization'], 'bigBoss');
        const restaurant = yield controller_1.RestaurantController.getInstance().createRestaurant(Object.assign({}, body));
        return res.status(http_status_codes_1.StatusCodes.CREATED).send(restaurant);
    }
    catch (err) {
        if (err instanceof lib_1.IncorrectArgumentException) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: err.toString() });
        }
        else if (err instanceof lib_1.ConflictException) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).send({ error: err.toString() });
        }
        else if (err instanceof lib_1.ExpiredException) {
            return res.status(498).send({ error: err.toString() });
        }
        else if (err instanceof lib_1.UnauthorizedException) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({ error: err.toString() });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}));
restaurantRoute.route('/:u_id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield controller_1.RestaurantController.getInstance().getById(req.params.u_id);
        return res.status(http_status_codes_1.StatusCodes.OK).send(restaurant);
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, lib_1.checkSpecificAuthor)(req.headers['authorization'], 'bigBoss');
        yield controller_1.RestaurantController.getInstance().delete(req.params.u_id);
        return res.status(http_status_codes_1.StatusCodes.OK).end();
    }
    catch (err) {
        if (err instanceof lib_1.ExpiredException) {
            return res.status(498).send({ error: err.toString() });
        }
        else if (err instanceof lib_1.UnauthorizedException) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({ error: err.toString() });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}));
exports.default = restaurantRoute;
//# sourceMappingURL=restaurant.js.map
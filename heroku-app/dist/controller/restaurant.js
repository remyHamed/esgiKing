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
exports.RestaurantController = void 0;
const model_1 = require("../model");
const lib_1 = require("../lib");
class RestaurantController {
    static getInstance() {
        if (RestaurantController.instance === undefined) {
            RestaurantController.instance = new RestaurantController();
        }
        return RestaurantController.instance;
    }
    createRestaurant(restaurant) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!restaurant.address) {
                throw new lib_1.IncorrectArgumentException("Missing restaurant address");
            }
            else if (!restaurant.name) {
                throw new lib_1.IncorrectArgumentException("Missing restaurant name");
            }
            const conflictRestaurant = yield model_1.RestaurantModel.find({ address: restaurant.address });
            if (conflictRestaurant.length) {
                throw new lib_1.ConflictException("A restaurant with this address already exist");
            }
            return yield new model_1.RestaurantModel(restaurant).save();
        });
    }
    getRestaurants() {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.RestaurantModel.find();
        });
    }
    getById(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield model_1.RestaurantModel.findById(restaurantId).exec();
            if (!document) {
                throw new lib_1.IncorrectArgumentException("Restaurant not found");
            }
            return document;
        });
    }
    delete(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield model_1.RestaurantModel.findOneAndRemove({ _id: restaurantId });
            if (!document) {
                throw new lib_1.IncorrectArgumentException("Restaurant not found");
            }
            return document;
        });
    }
}
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.js.map
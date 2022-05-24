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
exports.Command = void 0;
const model_1 = require("../model");
const lib_1 = require("../lib");
class Command {
    static getInstance() {
        if (Command.instance === undefined) {
            Command.instance = new Command();
        }
        return Command.instance;
    }
    getCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.CommandModel.find();
        });
    }
    createCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            command.settled = false;
            if (!command.productList.length) {
                throw new lib_1.IncorrectArgumentException("Missing products in Order");
            }
            else if (!command.restaurant) {
                throw new lib_1.IncorrectArgumentException("Missing restaurant id");
            }
            else if (!command.client) {
                throw new lib_1.IncorrectArgumentException("Missing client id");
            }
            return yield new model_1.CommandModel(command).save();
        });
    }
    getById(commandId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield model_1.CommandModel.findById(commandId);
            if (!document) {
                throw "Order not found";
            }
            return document;
        });
    }
    delete(commandId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield model_1.CommandModel.findOneAndRemove({ _id: commandId });
            if (!document) {
                throw "Order not found";
            }
            return document;
        });
    }
    acceptDelivery(commandId) {
        return __awaiter(this, void 0, void 0, function* () {
            const delivery = yield this.getById(commandId);
            if (delivery == null) {
                throw "Order not found";
            }
            delivery.settled = true;
            const res = yield delivery.save();
            return res;
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=command.js.map
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
exports.Product = void 0;
const model_1 = require("../model");
const lib_1 = require("../lib");
class Product {
    static getInstance() {
        if (Product.instance === undefined) {
            Product.instance = new Product();
        }
        return Product.instance;
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!product.name) {
                throw new lib_1.IncorrectArgumentException("Missing product name");
            }
            else if (!product.price) {
                throw new lib_1.IncorrectArgumentException("Missing product price");
            }
            const model = new model_1.ProductModel(product);
            return yield model.save();
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.ProductModel.find();
        });
    }
    getById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield model_1.ProductModel.findById(productId);
            if (!document) {
                throw new lib_1.NotFoundException("Product not found");
            }
            return document;
        });
    }
    delete(productDeleteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield model_1.ProductModel.findOneAndRemove({ _id: productDeleteId });
            if (!document) {
                throw new lib_1.NotFoundException("Product not found");
            }
            return document;
        });
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map
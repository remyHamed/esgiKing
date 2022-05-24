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
const product_1 = require("../controller/product");
const lib_1 = require("../lib");
const productRoute = (0, express_1.Router)();
productRoute.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(http_status_codes_1.StatusCodes.OK).send(yield product_1.Product.getInstance().getProducts());
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}))
    .post(express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = req.body;
    try {
        yield (0, lib_1.checkSpecificAuthor)(req.headers['authorization'], 'admin');
        const product = yield product_1.Product.getInstance().createProduct(Object.assign({}, productBody));
        return res.status(http_status_codes_1.StatusCodes.CREATED).send(product);
    }
    catch (err) {
        if (err instanceof lib_1.IncorrectArgumentException) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: err.toString() });
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
productRoute.route('/:p_id')
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, lib_1.checkSpecificAuthor)(req.headers['authorization'], 'admin');
        yield product_1.Product.getInstance().delete(req.params.p_id);
        return res.status(http_status_codes_1.StatusCodes.OK).end();
    }
    catch (err) {
        if (err instanceof lib_1.NotFoundException) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({ error: err.toString() });
        }
        else if (err instanceof lib_1.ExpiredException) {
            return res.status(498).send({ error: err.toString() });
        }
        else if (err instanceof lib_1.UnauthorizedException) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({ error: err.toString() });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.getInstance().getById(req.params.p_id);
        return res.status(http_status_codes_1.StatusCodes.OK).send(product);
    }
    catch (err) {
        if (err instanceof lib_1.NotFoundException) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({ error: err.toString() });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
    }
}));
exports.default = productRoute;
//# sourceMappingURL=product.js.map
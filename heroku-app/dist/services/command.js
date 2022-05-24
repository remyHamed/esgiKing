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
const commandRoute = (0, express_1.Router)();
commandRoute.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, lib_1.checkSpecificAuthor)(req.headers['authorization'], 'admin');
        return res.status(http_status_codes_1.StatusCodes.OK).send(yield controller_1.Command.getInstance().getCommands());
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
}))
    .post(express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield (0, lib_1.checkSpecificAuthor)(req.headers['authorization'], 'client');
        const command = yield controller_1.Command.getInstance().createCommand(Object.assign({}, body));
        return res.status(http_status_codes_1.StatusCodes.CREATED).send(command);
    }
    catch (err) {
        if (err instanceof lib_1.ExpiredException) {
            return res.status(498).send({ error: err.toString() });
        }
        else if (err instanceof lib_1.UnauthorizedException) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({ error: err.toString() });
        }
        else if (err instanceof lib_1.IncorrectArgumentException) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: err.toString() });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err }).end();
    }
}));
commandRoute.route('/:c_id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, lib_1.checkSpecificAuthor)(req.headers['authorization'], 'delivery');
        const command = yield controller_1.Command.getInstance().getById(req.params.c_id);
        return res.status(http_status_codes_1.StatusCodes.OK).send(command);
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
}))
    .patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, lib_1.checkSpecificAuthor)(req.headers['authorization'], 'admin');
        const command = yield controller_1.Command.getInstance().acceptDelivery(req.params.c_id);
        return res.status(http_status_codes_1.StatusCodes.OK).send(command);
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
exports.default = commandRoute;
//# sourceMappingURL=command.js.map
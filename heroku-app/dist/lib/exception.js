"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = exports.ExpiredException = exports.ConflictException = exports.IncorrectArgumentException = exports.NotFoundException = void 0;
class Exception {
    constructor(message) {
        this.message = message;
        this.type = "Error";
    }
    toString() {
        return `${this.type}: ${this.message}`;
    }
}
class NotFoundException extends Exception {
    constructor(message) {
        super(message);
        this.type = "Not Found";
    }
}
exports.NotFoundException = NotFoundException;
class IncorrectArgumentException extends Exception {
    constructor(message) {
        super(message);
        this.type = "Incorrect Argument";
    }
}
exports.IncorrectArgumentException = IncorrectArgumentException;
class ConflictException extends Exception {
    constructor(message) {
        super(message);
        this.type = "Conflict";
    }
}
exports.ConflictException = ConflictException;
class ExpiredException extends Exception {
    constructor(message) {
        super(message);
        this.type = "Expired";
    }
}
exports.ExpiredException = ExpiredException;
class UnauthorizedException extends Exception {
    constructor(message) {
        super(message);
        this.type = "Not Authorized";
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=exception.js.map
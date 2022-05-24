declare class Exception {
    message: string;
    type: string;
    constructor(message: string);
    toString(): string;
}
export declare class NotFoundException extends Exception {
    constructor(message: string);
}
export declare class IncorrectArgumentException extends Exception {
    constructor(message: string);
}
export declare class ConflictException extends Exception {
    constructor(message: string);
}
export declare class ExpiredException extends Exception {
    constructor(message: string);
}
export declare class UnauthorizedException extends Exception {
    constructor(message: string);
}
export {};

class Exception {
    message;
    type;
    constructor(message: string) {
        this.message = message;
        this.type = "Error";
    }

    toString() {
        return `${this.type}: ${this.message}`;
    }
}

export class NotFoundException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Not Found";
    }
}

export class IncorrectArgumentException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Incorrect Argument";
    }
}

export class ConflictException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Conflict";
    }
}

export class ExpiredException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Expired";
    }
}

export class UnauthorizedException extends Exception {
    constructor(message: string) {
        super(message)
        this.type = "Not Authorized";
    }
}
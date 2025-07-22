export class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }
}

export class ConflictException extends HttpException {
    constructor(message: string) {
        super(409, message);
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string) {
        super(404, message);
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
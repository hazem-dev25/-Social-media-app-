"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = exports.ForbiddenException = exports.UnauthorizedException = exports.NotFoundException = exports.BadRequestException = exports.ApplicationException = void 0;
class ApplicationException extends Error {
    statusCode;
    constructor(message, statusCode = 500, cause) {
        this.statusCode = statusCode;
        {
            super(message, { cause });
        }
    }
}
exports.ApplicationException = ApplicationException;
class BadRequestException extends ApplicationException {
    constructor(message, cause) {
        super(message, 400, { cause });
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends ApplicationException {
    constructor(message, cause) {
        super(message, 404, { cause });
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends ApplicationException {
    constructor(message, cause) {
        super(message, 401, { cause });
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends ApplicationException {
    constructor(message, cause) {
        super(message, 403, { cause });
    }
}
exports.ForbiddenException = ForbiddenException;
class ConflictException extends ApplicationException {
    constructor(message, cause) {
        super(message, 409, { cause });
    }
}
exports.ConflictException = ConflictException;

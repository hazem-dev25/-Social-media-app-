
export class ApplicationException extends Error {
    constructor(message: string , public statusCode: number = 500, cause?: unknown){ 
        super(message , { cause })
}}



export class BadRequestException extends ApplicationException {
    constructor(message: string  ,  cause?: unknown){
        super(message, 400, { cause })
    }}


export class NotFoundException extends ApplicationException {
    constructor(message: string  ,  cause?: unknown){
        super(message, 404, { cause })
    }}


export class UnauthorizedException extends ApplicationException {
    constructor(message: string  ,  cause?: unknown){
        super(message, 401, { cause })
    }}


export class ForbiddenException extends ApplicationException {
    constructor(message: string  ,  cause?: unknown){
        super(message, 403, { cause })
    }}

export class ConflictException extends ApplicationException {
    constructor(message: string  ,  cause?: unknown){
        super(message, 409, { cause })
    }}


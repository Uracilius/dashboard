// errorTypes.js
class BaseError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

class ValidationError extends BaseError {
    constructor(message) {
        super('ValidationError', 400, message);
    }
}

class NotFoundError extends BaseError {
    constructor(message) {
        super('NotFoundError', 404, message);
    }
}

class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized') {
        super('UnauthorizedError', 401, message);
    }
}

class ForbiddenError extends BaseError {
    constructor(message = 'Forbidden') {
        super('ForbiddenError', 403, message);
    }
}

module.exports = {
    BaseError,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError
};

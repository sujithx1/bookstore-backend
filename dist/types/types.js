"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.ErrorCodes = void 0;
exports.ErrorCodes = {
    serverError: 'An unexpected error occurred on the server.',
    userBlocked: 'User is Blocked.',
    passwordMismatch: 'The provided passwords do not match.',
    userNotFound: 'The requested user could not be found.',
    resourceNotFound: 'The requested resource was not found.',
    bookNotFound: 'The requested Book was not found.',
    addressNotFound: 'The requested Book was not found.',
    ordersNotFound: 'The requested orders was not found.',
    validationError: 'Validation failed. Please check the input fields.',
    missingId: 'A required ID is missing.',
    emailAlreadyExists: 'An account with this email already exists.',
    usernameAlreadyExists: 'This username is already taken.'
};
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["CONFLICT"] = 409] = "CONFLICT";
    StatusCode[StatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusCode || (exports.StatusCode = StatusCode = {}));

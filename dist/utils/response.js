"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseError = exports.responseSuccess = void 0;
const responseSuccess = (statusCode, message, data) => {
    return {
        statusCode,
        message,
        data,
    };
};
exports.responseSuccess = responseSuccess;
const responseError = (statusCode, message, error) => {
    return {
        statusCode,
        message,
        error,
    };
};
exports.responseError = responseError;
//# sourceMappingURL=response.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkReqAuth = void 0;
const moment_1 = __importDefault(require("moment"));
const lodash_1 = require("lodash");
const crypto_js_1 = __importDefault(require("crypto-js"));
const Constant_1 = __importDefault(require("../constants/Constant"));
const checkReqAuth = (req) => {
    // return true
    // Don't check auth, for testing (if needed)
    if ((0, lodash_1.get)(req, 'query.noAuth') == 1)
        return true;
    const serverUrl = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}`;
    const { Signature, clientTime } = req.query;
    // Check time diff
    const serverTime = (0, moment_1.default)();
    const timeDiff = serverTime.diff(moment_1.default.unix(clientTime), 'seconds');
    // Generate signature
    const serverSignature = crypto_js_1.default.MD5(clientTime + (0, lodash_1.get)(process, 'env.SALT') + serverUrl).toString();
    // Check if timeDiff is under or equal 3 seconds and if signature between client and server is matched
    return timeDiff <= Constant_1.default.MAX_REQ_SECONDS_DIFFERENCE && Signature === serverSignature;
};
exports.checkReqAuth = checkReqAuth;
//# sourceMappingURL=request.js.map
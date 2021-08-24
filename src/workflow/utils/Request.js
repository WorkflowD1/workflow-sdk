"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
var axios_1 = __importDefault(require("axios"));
function signIn(_a) {
    var email = _a.email, password = _a.password, baseURL = _a.baseURL;
    return axios_1.default({
        baseURL: baseURL,
        url: '/cognito/user/signIn',
        method: 'POST',
        data: {
            email: email,
            password: password
        }
    });
}
exports.signIn = signIn;

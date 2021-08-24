"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
var axios_1 = __importDefault(require("axios"));
function signIn(_a) {
    var username = _a.username, password = _a.password, url = _a.url;
    return axios_1.default({
        url: url,
        data: {
            username: username,
            password: password
        }
    });
}
exports.signIn = signIn;

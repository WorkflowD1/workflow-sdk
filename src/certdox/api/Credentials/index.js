"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credentials = void 0;
class Credentials {
    constructor({ login, password }) {
        this.login = login;
        this.password = password;
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            // Do something
        });
    }
    isTokenValid() {
        return __awaiter(this, void 0, void 0, function* () {
            // Do something more
        });
    }
    setToken(token, expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            // More and more and more...
        });
    }
}
exports.Credentials = Credentials;

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credentials = void 0;
const utils_1 = require("../utils");
class Credentials {
    /**
     *
     * @param email workflows.d1.cx email
     * @param password workflows.d1.cx password
     * @param baseURL workflows.d1.cx url without last forward slash
     * @returns This methods return Workflow credentials token
     */
    constructor({ email, password, baseURL }, options) {
        this.email = email;
        this.password = password;
        this.baseURL = baseURL.replace(/\/$/, '');
        if (options === null || options === void 0 ? void 0 : options.redis) {
            const { redis } = options;
            const { key } = redis, redisClientOptions = __rest(redis, ["key"]);
            this.redis = utils_1.Redis.getInstance(redisClientOptions, key);
        }
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.redis && (yield this.isTokenValid())) {
                return this.redis.retrieveToken();
            }
            const { data: { token, expiration } } = yield utils_1.WorkflowRequest.signIn({ email: this.email, password: this.password, baseURL: this.baseURL });
            yield this.setToken(token, expiration);
            return token;
        });
    }
    isTokenValid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.redis && (yield this.redis.hasToken())) {
                return true;
            }
            return false;
        });
    }
    setToken(token, expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.redis) {
                yield this.redis.updateToken(token, expiration);
            }
        });
    }
}
exports.Credentials = Credentials;

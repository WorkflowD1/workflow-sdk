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
exports.Redis = void 0;
const redis_1 = require("redis");
const util_1 = require("util");
class Redis {
    constructor(options, key) {
        this.key = key;
        this.client = redis_1.createClient(options);
    }
    static getInstance(options, key) {
        if (!Redis.instance) {
            return new Redis(options, key);
        }
        return Redis.instance;
    }
    retrieveToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getRedisKeyAsync();
            return token;
        });
    }
    updateToken(token, expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setRedisTokenAsync(token);
            yield this.expireRedisTokenAsync(expiration);
        });
    }
    hasToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getRedisKeyAsync();
            return !!token;
        });
    }
    getRedisKeyAsync() {
        const getAsync = util_1.promisify(this.client.get).bind(this.client);
        return getAsync(this.key);
    }
    setRedisTokenAsync(token) {
        const setAsync = util_1.promisify(this.client.set).bind(this.client);
        return setAsync(this.key, token);
    }
    expireRedisTokenAsync(expiration) {
        const expireToken = util_1.promisify(this.client.expire).bind(this.client);
        const seconds = expiration - Math.floor(new Date().getTime() / 1000);
        return expireToken(this.key, seconds);
    }
}
exports.Redis = Redis;

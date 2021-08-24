"use strict";
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
exports.Redis = void 0;
var redis_1 = require("redis");
var util_1 = require("util");
var AsyncRedisClient = util_1.promisify(redis_1.RedisClient.prototype);
var Redis = /** @class */ (function () {
    function Redis(options) {
        if (options) {
            var key = options.key, clientOptions = __rest(options, ["key"]);
            Redis.key = key;
            Redis.client = redis_1.createClient(clientOptions);
        }
    }
    Redis.getInstance = function (options) {
        if (!Redis.instance && options) {
            return new Redis(options);
        }
        return this.instance;
    };
    Redis.retrieveToken = function () {
        return yield Redis.client.get(Redis.key);
    };
    Redis.hasToken = function () {
        return !!Redis.client.get(Redis.key);
    };
    Redis.updateToken = function (token, expiration) {
        Redis.client.set(Redis.key, token);
        Redis.client.expire(Redis.key, expiration);
    };
    return Redis;
}());
exports.Redis = Redis;

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var utils_1 = require("../utils");
var Credentials = /** @class */ (function () {
    /**
     *
     * @param email workflows.d1.cx email
     * @param password workflows.d1.cx password
     * @param baseURL workflows.d1.cx url without last forward slash
     * @returns This methods return Workflow credentials token
     */
    function Credentials(_a, options) {
        var email = _a.email, password = _a.password, baseURL = _a.baseURL;
        this.email = email;
        this.password = password;
        this.baseURL = baseURL.replace(/\/$/, '');
        if (options === null || options === void 0 ? void 0 : options.redis) {
            var redis = options.redis;
            var key = redis.key, redisClientOptions = __rest(redis, ["key"]);
            this.redis = utils_1.Redis.getInstance(redisClientOptions, key);
        }
    }
    Credentials.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, token, expiration;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.redis;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isTokenValid()];
                    case 1:
                        _a = (_c.sent());
                        _c.label = 2;
                    case 2:
                        if (_a) {
                            return [2 /*return*/, this.redis.retrieveToken()];
                        }
                        return [4 /*yield*/, utils_1.WorkflowRequest.signIn({ email: this.email, password: this.password, baseURL: this.baseURL })];
                    case 3:
                        _b = (_c.sent()).data, token = _b.token, expiration = _b.expiration;
                        return [4 /*yield*/, this.setToken(token, expiration)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    Credentials.prototype.isTokenValid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.redis;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.redis.hasToken()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Credentials.prototype.setToken = function (token, expiration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.redis) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.redis.updateToken(token, expiration)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return Credentials;
}());
exports.Credentials = Credentials;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credentials = void 0;
var utils_1 = require("../utils");
var Credentials = /** @class */ (function () {
    /**
     *
     * @param username workflows.d1.cx username
     * @param password workflows.d1.cx password
     * @param baseUrl workflows.d1.cx url
     */
    function Credentials(_a) {
        var username = _a.username, password = _a.password, url = _a.url;
        this.username = username;
        this.password = password;
        this.url = url;
    }
    Credentials.prototype.getToken = function () {
        return utils_1.signIn({ username: this.username, password: this.password, url: this.url });
    };
    return Credentials;
}());
exports.Credentials = Credentials;

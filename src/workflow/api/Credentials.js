"use strict";
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
    function Credentials(_a) {
        var email = _a.email, password = _a.password, baseURL = _a.baseURL;
        this.email = email;
        this.password = password;
        this.baseURL = baseURL.replace(/\/$/, '');
    }
    Credentials.prototype.getToken = function () {
        return utils_1.signIn({ email: this.email, password: this.password, baseURL: this.baseURL });
    };
    return Credentials;
}());
exports.Credentials = Credentials;

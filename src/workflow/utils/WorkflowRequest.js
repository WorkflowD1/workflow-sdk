"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowRequest = void 0;
var axios_1 = __importDefault(require("axios"));
var WorkflowRequest = /** @class */ (function () {
    function WorkflowRequest() {
    }
    WorkflowRequest.signIn = function (_a) {
        var email = _a.email, password = _a.password, baseURL = _a.baseURL;
        WorkflowRequest.baseURL = baseURL;
        return axios_1.default({
            baseURL: baseURL,
            url: '/cognito/user/signIn',
            method: 'POST',
            data: {
                email: email,
                password: password
            }
        });
    };
    WorkflowRequest.documentCreate = function (data, token) {
        return axios_1.default({
            baseURL: WorkflowRequest.baseURL,
            url: '/document/create',
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            data: data
        });
    };
    WorkflowRequest.documentUpdate = function (data, token) {
        return axios_1.default({
            baseURL: WorkflowRequest.baseURL,
            url: '/document/updateById',
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            data: data
        });
    };
    WorkflowRequest.documentLoad = function (data, token) {
        return axios_1.default({
            baseURL: WorkflowRequest.baseURL,
            url: '/document/filter',
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token
            },
            data: data
        });
    };
    return WorkflowRequest;
}());
exports.WorkflowRequest = WorkflowRequest;

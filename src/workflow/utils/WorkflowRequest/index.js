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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowRequest = void 0;
const axios_1 = __importDefault(require("axios"));
class WorkflowRequest {
    constructor(baseURL, credentialsObject) {
        this.baseURL = baseURL;
        this.credentialsObject = credentialsObject;
        this.currentCredentials = credentialsObject.default;
    }
    static signIn({ email, password, baseURL }) {
        return axios_1.default({
            baseURL,
            url: '/cognito/user/signIn',
            method: 'POST',
            data: {
                email,
                password
            }
        });
    }
    documentCreate(data) {
        return this.request('/document/create', data);
    }
    documentUpdate(data) {
        return this.request('/document/updateById', data);
    }
    documentLoad(data) {
        return this.request('/document/filter', data);
    }
    documentLoadById(data) {
        return this.request('/document/loadById', data);
    }
    attachmentUploadFile(data) {
        return this.request('/attachment/upload/link', data);
    }
    attachmentUpdateById(data) {
        return this.request('/attachment/updateById', data);
    }
    attachmentCreatePendency(data) {
        return this.request('/attachment/createPendency', data);
    }
    attachmentLoadPendency(data) {
        return this.request('/attachment/loadPendency', data);
    }
    observationCreate(data) {
        return this.request('/observation/create', data);
    }
    observationDeleteById(data) {
        return this.request('/observation/deleteById', data);
    }
    request(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.currentCredentials.getToken();
            return axios_1.default({
                baseURL: this.baseURL,
                url,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data
            });
        });
    }
}
exports.WorkflowRequest = WorkflowRequest;

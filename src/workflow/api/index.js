"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = void 0;
const Document_1 = require("./Document/");
const Attachment_1 = require("./Attachment/");
const Observation_1 = require("./Observation/");
__exportStar(require("./Credentials/"), exports);
class Workflow {
    constructor(credentials) {
        this.document = new Document_1.Document(credentials);
        this.attachment = new Attachment_1.Attachment(credentials);
        this.observation = new Observation_1.Observation(credentials);
    }
}
exports.Workflow = Workflow;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodAuthentication = void 0;
function MethodAuthentication(methodsToRemove) {
    function updateCredentials(instance, credentialKey) {
        instance.currentCredentials = credentialKey
            ? instance.credentialsObject[credentialKey]
            : instance.credentialsObject.default;
    }
    return function (target) {
        const classMethods = Object.getOwnPropertyNames(target.prototype);
        classMethods.forEach(targetMethod => {
            if (!['constructor', ...(methodsToRemove || [])].find(mappedMethod => targetMethod === mappedMethod)) {
                const oldFunction = target.prototype[targetMethod];
                target.prototype[targetMethod] = function () {
                    updateCredentials(this, arguments[1]);
                    return oldFunction.apply(this, arguments);
                };
            }
        });
    };
}
exports.MethodAuthentication = MethodAuthentication;

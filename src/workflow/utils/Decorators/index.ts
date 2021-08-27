export function MethodAuthentication(methodsToRemove?: string[]) {

  function updateCredentials(instance: any, credentialKey: string) {
    instance.currentCredentials = credentialKey
      ? instance.credentialsObject[credentialKey]
      : instance.credentialsObject.default
  }

  return function (target: any) {
    const classMethods = Object.getOwnPropertyNames(target.prototype)

    classMethods.forEach(targetMethod => {
    
      if (!['constructor', ...(methodsToRemove || [])].find(mappedMethod => targetMethod === mappedMethod)) {
    
        const oldFunction: Function = target.prototype[targetMethod];
    
        target.prototype[targetMethod] = function () {
          updateCredentials(this, arguments[1]);
          return oldFunction.apply(this, arguments);
        }
        
      }
    })
  }
}
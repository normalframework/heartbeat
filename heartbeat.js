const NormalSdk = require("@normalframework/applications-sdk");

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({globalVariables, sdk, update, args}) => {
  let heartbeat = globalVariables[0] 
  let newval = heartbeat.latestValue.value  ? 0 : 1;
  sdk.logEvent(`setting heartbeat to ${newval}`)
  heartbeat.write(newval)
};
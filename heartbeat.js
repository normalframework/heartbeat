const NormalSdk = require("@normalframework/applications-sdk");

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({globalVariables, sdk, update, args}) => {
  let heartbeat = globalVariables[0] 

  try { 
    // the point is created by the global variable, but automatically export this as BACnet
    await sdk.http.post("/api/v1/bacnet/local", {
      "uuid": heartbeat.uuid,
      "object_id": {
        "object_type": "OBJECT_BINARY_VALUE"
      },
      "props": [ 
        {
          "property": "PROP_OBJECT_NAME",
          "value" : {
            "character_string": "Heartbeat"
          }
        }
      ] 
    })
  } catch (e) {
     if (e.status !== 409) {
       console.error("BACnet POST error:", e.message || e);
     }
  }
    
  let newval = heartbeat.latestValue.value  ? 0 : 1;
  sdk.logEvent(`setting heartbeat to ${newval}`)
  await heartbeat.write(newval)
};
//@req(nodeGroup, upLimit, downLimit)
var envName = "${env.envName}";

var types = [{
    resourceType: "MEM",
    scaleUpValue: 70,
    scaleUpLimit: upLimit,
    scaleUpLoadPeriod: 5,
    scaleDownValue: 40,
    scaleDownLimit: downLimit,
    scaleDownLoadPeriod: 5
}, {
    resourceType: "CPU",
    scaleUpValue: 70,
    scaleUpLimit: upLimit,
    scaleUpLoadPeriod: 5,
    scaleDownValue: 40,
    scaleDownLimit: downLimit,
    scaleDownLoadPeriod: 5
}];

var cleanOldTriggers = true;

if (cleanOldTriggers) {
    var actions = ['ADD_NODE', 'REMOVE_NODE'];
    for (var i = 0; i < actions.length; i++) {
        var array = jelastic.env.trigger.GetTriggers(envName, session, actions[i]).array;
        for (var j = 0; j < array.length; j++) {
            if (array[j].nodeGroup == nodeGroup) jelastic.env.trigger.DeleteTrigger(envName, session, array[j].id);
        }
    }
}

for (var i = 0; i < types.length; i++) {
    t = types[i];

    resp = jelastic.env.trigger.AddTrigger(envName, session, {
        name: "scale-up",
        isEnabled: true,
        nodeGroup: nodeGroup,
        period: t.scaleUpLoadPeriod,
        condition: {
            type: "GREATER",
            value: t.scaleUpValue,
            resourceType: t.resourceType,
            valueType: "PERCENTAGES"
        },
        actions: [{
            type: "ADD_NODE",
            customData: {
                limit: t.scaleUpLimit,
                count: 1,
                notify: true
            }
        }]
    });

    if (resp.result != 0) return resp;

    resp = jelastic.env.trigger.AddTrigger(envName, session, {
        isEnabled: true,
        name: "scale-down",
        nodeGroup: nodeGroup,
        period: t.scaleDownLoadPeriod,
        condition: {
            type: "LESS",
            value: t.scaleDownValue,
            resourceType: t.resourceType,
            valueType: "PERCENTAGES"
        },
        actions: [{
            type: "REMOVE_NODE",
            customData: {
                limit: t.scaleDownLimit,
                count: 1,
                notify: true
            }
        }]
    });
    if (resp.result != 0) return resp;
}


return {
    result: 0
}

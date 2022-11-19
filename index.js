exports.handler = async (event, intent) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(
            {
                "session": {
                  "id": "001",
                  "params": {}
                },
                "prompt": {
                  "override": false,
                  "firstSimple": {
                    "speech": "Got it. Trail conditions at Pleasant Valley are Dry and All Clear as of July 22",
                    "text": ""
                  }
                },
                "scene": {
                  "name": "SceneName",
                  "slots": {},
                  "next": {
                    "name": "actions.scene.END_CONVERSATION"
                  }
                }
              }
              
        ),
    };
    return response;
};


var req = require('request');
const params = {
    url: 'https://www.trailforks.com/widgets/trails_status/?rid=38974&data-displaytype=table&dataunsanctioned=1&data-officialonly=0&data-active=0&data-d=1&data-c=0&data-p=0',
    headers: { 'Content-Type': 'application/json' },
    json: JSON.parse({ id: 1})
};
req.post(params, function(err, res, body) {
    if(err){
        console.log('------error------', err);
    } else{
        console.log('------success--------', body);
    }
});
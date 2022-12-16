const https = require('https');

//Trail intents to trailid

const trailNumber = {
    pleasantv : 140133,
    laphamp : 268524,
    minooka : 50215,
    hurl : 5007,
    flowerp : 523733,
    landmine : 5009,
    rusty : 5012
}

const statusObj = {
    1 : "Clear / Green",
    2 : "Minor Issue / Yellow",
    3 : "Significant Issue / Amber",
    4 : "Closed"
}

const conditionObj = {
    0 : "Unknown",
    10 : "Snow Groomed",
    1 : "Snow Packed",
    7 : "Snow Covered",
    12 : "Snow Cover Inadequate",
    8 : "Freeze/Thaw Cycle",
    9 : "Icy",
    2 : "Prevalent Mud",
    3 : "Wet",
    4 : "Variable",
    11 : "Ideal",
    5 : "Dry",
    6 : "Very Dry"
}

function getRequest() {
  const url = 'https://www.trailforks.com/api/1/trail?id=140133&scope=full&api_key=docs';
// const url = 'https://www.trailforks.com/api/1/trail?id=' + trailName[responseJson.intent.query] + '&scope=full&api_key=docs';
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
}

exports.handler = async event => {
  try {
    const result = await getRequest();
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(JSON.parse(event.body)));
    console.log(JSON.stringify(JSON.parse(event.body.handler)));


    // 👇️️ response structure assume you use proxy integration with API gateway
    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
            "session": {
              "id": "001",
              "params": {}
            },
            "prompt": {
              "override": false,
              "firstSimple": {
                "speech": "Got it. The trail status at " + result.data.title + " is currently: " + statusObj[result.data.status] + ", with conditions rated as " + conditionObj[result.data.condition],
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
      ), //result.data.alias
    };
  } catch (error) {
    console.log('Error is probably HTTP instead of JSON: 👉️', error);
    return {
      statusCode: 203,
      body: error.message,
    };
  }
};

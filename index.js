const https = require('https');

//Trail intents to trailid
const pleasantv = 140133;
const laphamp = 268524;
const minooka = 50215;
const hurl = 5007;
const flowerp = 523733;
const landmine = 5009;
const rusty = 5012;

function condition = {
    this.0 : "Unknown",
    this.10 : "Snow Groomed",
    this.1 : "Snow Packed",
    this.7 : "Snow Covered",
    this.12 : "Snow Cover Inadequate",
    this.8 : "Freeze/thaw Cycle",
    this.9 : "Icy",
    this.2 : "Prevalent Mud",
    this.3 : "Wet",
    this.4 : "Variable",
    this.11 : "Ideal",
    this.5 : "Dry",
    this.6 : "Very Dry"
}


function getRequest() {
  const url = 'https://www.trailforks.com/api/1/trail?id=140133&scope=full&api_key=docs';

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
    console.log('result is: 👉️', result);

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
                "speech": "Got it. Trail conditions at " + result.data.title + " are rated at " + condition(result.data.condition),
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

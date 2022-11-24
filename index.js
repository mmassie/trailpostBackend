const https = require('https');

//Trail intents to trailid
const pleasantv = 140133;
const laphamp = 268524;
const minooka = 50215;
const hurl = 5007;
const flowerp = 523733;
const landmine = 5009;
const rusty = 5012;

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

/exports.handler = async event => {
  try {
    const result = await getRequest();
    console.log('result is: 👉️', result);

    // 👇️️ response structure assume you use proxy integration with API gateway
    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(result.alias),
    };
  } catch (error) {
    console.log('Error is: 👉️', error);
    return {
      statusCode: 203,
      body: error.message,
    };
  }
  
 /* exports.handler = async (event, intent) => {
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
                    "speech": res.on.alias // "Got it. Trail conditions at Pleasant Valley are Dry and All Clear as of July 22",
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
    }; */
    return response;
};

};

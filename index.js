const https = require('https');

// var trailRequest = "Landmine"; 
const trailNumber = {
    PleasantValley : 140133,
    LaphamPeak : 268524,
    Minooka : 50215,
    Hurl : 5007,
    FlowerPower : 523733,
    Landmine : 5009,
    Rusty : 5012
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

function getRequest(trailRequest) {
//const url = 'https://www.trailforks.com/api/1/trail?id=140133&scope=full&api_key=docs';
const url = 'https://www.trailforks.com/api/1/trail?id=' + trailNumber[trailRequest] + '&scope=full&api_key=docs';
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
    //const result = await getRequest();
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(JSON.parse(event.body)));

    let trailRequest = JSON.parse(event.body).intent.name;
    console.log(trailRequest);
    const result = await getRequest(trailRequest);
    console.log(result.data.last_report_ts);

    let milliseconds = result.data.last_report_ts;
    let myDate = new Date( milliseconds );

    let dateStr = (myDate.getMonth() + 1) + "/" + myDate.getDate();

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
                "speech": "Got it. The trail status at " + trailRequest + " is currently: " + statusObj[result.data.status] + ", with conditions rated as " + conditionObj[result.data.condition] + "Last updated on " + dateStr,
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

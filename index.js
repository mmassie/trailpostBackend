const https = require('https');

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
  const url = `https://www.trailforks.com/api/1/trail?id=${trailNumber[trailRequest]}&scope=full&api_key=docs`;
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
          reject(err);
        }
      });
    });

    req.on('error', err => {
      reject(err);
    });
  });
}

exports.handler = async event => {
  try {
    const trailRequest = JSON.parse(event.body).intent.name;

    if (!trailNumber[trailRequest]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Unknown trail: ${trailRequest}` }),
      };
    }

    const result = await getRequest(trailRequest);

    if (!result.data) {
      throw new Error('Unexpected API response: missing data field');
    }

    const date = new Date(result.data.last_report_ts * 1000);
    const lastPost = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const status = statusObj[result.data.status] ?? 'Unknown';
    const condition = conditionObj[result.data.condition] ?? 'Unknown';

    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        session: { id: "001", params: {} },
        prompt: {
          override: false,
          firstSimple: {
            speech: `Got it. The trail status at ${trailRequest} is currently: ${status}, with conditions rated as ${condition}. Last updated on ${lastPost}`,
            text: ""
          }
        },
        scene: {
          name: "SceneName",
          slots: {},
          next: { name: "actions.scene.END_CONVERSATION" }
        }
      }),
    };
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};

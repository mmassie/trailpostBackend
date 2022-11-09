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
                    "speech": "Got it. Trail conditions at Lapham Peak are All Clear as of July 22",
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

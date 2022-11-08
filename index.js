exports.handler = async (event, intent) => {
    // TODO implement
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
                    "speech": "I hear you're interested in Pleasant Valley trail conditions... that's coming soon. In the mean time, go outside.",
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

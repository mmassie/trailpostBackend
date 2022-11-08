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
                    "speech": "I hear you're interested in ", intent.name, "  trail conditions.. that's coming soon.",
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

    // Listen for PV Trigger
    
    // Call Trailforks API with ID

    // Store PV return value

    // Return condition and last time updated


};

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        // body: JSON.stringify('Hello Mike,from the Trailpost Lambda API Server, via GitHub!'),
        body: JSON.stringify(
            {
                "session": {
                  "id": "example_session_id",
                  "params": {}
                },
                "prompt": {
                  "override": false,
                  "firstSimple": {
                    "speech": "I hear you're interested in Pleasant Valley's trail conditions.. that's coming soon.",
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

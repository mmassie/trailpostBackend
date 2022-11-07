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
                  "content": {
                    "card": {
                      "title": "Card Title",
                      "subtitle": "Card Subtitle",
                      "text": "Card Content",
                      "image": {
                        "alt": "Google Assistant logo",
                        "height": 0,
                        "url": "https://developers.google.com/assistant/assistant_96.png",
                        "width": 0
                      }
                    }
                  },
                  "firstSimple": {
                    "speech": "This is a card rich response.",
                    "text": ""
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

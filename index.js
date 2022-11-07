exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        // body: JSON.stringify('Hello Mike,from the Trailpost Lambda API Server, via GitHub!'),
        body: JSON.stringify(
            app.handle('rich_response', conv => {
                conv.add('This is a card rich response - but also, hello from Lambda.');
                conv.add(new Card({
                  title: 'Card Title',
                  subtitle: 'Card Subtitle',
                  text: 'Card Content',
                  image: new Image({
                    url: 'https://developers.google.com/assistant/assistant_96.png',
                    alt: 'Google Assistant logo'
                  })
                }));
              });
              
        ),
    };
    return response;

    // Listen for PV Trigger
    
    // Call Trailforks API with ID

    // Store PV return value

    // Return condition and last time updated


};

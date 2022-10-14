exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello Mike,from the Trailpost Lambda API Server, via GitHub!'),
    };
    return response;
};

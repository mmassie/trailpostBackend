exports.handler = async (event) => {
    // TODO implement
    // Github Actions to Lambda Test
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello Mike from the Trailpost Lambda API Server!'),
    };
    return response;
};

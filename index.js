exports.handler = async (event) => {
    // TODO implement
    // Test for CICD solution in Github
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello Mike from the Trailpost Lambda API Server!'),
    };
    return response;
};

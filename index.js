const {
    constructCustomErrorByType
} = require('./lib/utils');
const {
    processGet,
    processPut
} = require('./lib/request');
const {
    buildErrorResponse,
    buildSuccessResponse
} = require('./lib/response');

const processEvent = async ({
    httpMethod,
    body,
    pathParameters,
    resource,
    queryStringParameters
}) => {
    try {
        let result = null;
        const resourceSplitBySlash = resource.split('/');
        const lastItemFromResource = resourceSplitBySlash.pop();
        const rsc = lastItemFromResource.includes('{') ?
            resourceSplitBySlash.pop() :
            lastItemFromResource;

        const objectToProcess = {
            pathParameters: pathParameters || {},
            queryParameters: queryStringParameters || {},
            body,
            resource: rsc
        };

        switch (httpMethod) {
            case 'GET':
                result = await processGet(objectToProcess);
                break;
            case 'PUT':
                result = await processPut(objectToProcess)
                break;
            default:
                // TODO: construct error
                break;
        }

        return buildSuccessResponse(result);
    } catch (e) {
        console.error(`Error procesing request`, e);
        return buildErrorResponse(e);
    }
};

exports.handler = async event => await processEvent(event);

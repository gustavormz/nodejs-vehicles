import utils from './lib/utils';
import {
    processGet,
    processPut
} from './lib/request';
import {
    buildErrorResponse,
    buildSuccessResponse
} from './lib/response';

const processEvent = async ({
    httpMethod,
    body,
    pathParameters,
    resource
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

export async function handler (event) {
    return await processEvent(event);
}

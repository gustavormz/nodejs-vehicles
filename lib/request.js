import query from './query';

export const processGet = async ({
    pathParameters,
    queryParameters,
    body
}) => {
    try {
        let data = null;
        let responseType = `default`;


        return {
            data,
            type: responseType
        };
    } catch (e) {
        throw e;
    }
};

export const processPut = async ({
    pathParameters,
    queryParameters,
    body
}) => {
    try {
        let data = null;
        let responseType = `default`;


        return {
            data,
            type: responseType
        };
    } catch (e) {
        throw e;
    }
};

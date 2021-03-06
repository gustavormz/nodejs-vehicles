const ERROR_TYPE_MAP = {
    default: {
        code: 500,
        message: `Internal Server Error`
    }
};

const SUCCESS_TYPE_MAP = {
    default: {
        code: 200,
        message: `Operation Executed Correctly`
    }
};

const getSuccessObjectByType = successType => SUCCESS_TYPE_MAP[successType] || SUCCESS_TYPE_MAP.default;

const getErrorObjectByType = errorType => ERROR_TYPE_MAP[errorType] || ERROR_TYPE_MAP.default;

export const buildErrorResponse = ({
    type: errorType,
    message: errorMessage
}) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };

    const {
        code: statusCode,
        message
    } = getErrorObjectByType(errorType);

    const body = JSON.stringify({
        errorType: errorType || `INTERNAL_SERVER_ERROR`,
        message: errorMessage || message,
        error: true
    });

    return {
        statusCode,
        headers,
        body
    };
};

export const buildSuccessResponse = ({
    type: successType,
    data
}) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };

    const {
        code: statusCode,
        message
    } = getSuccessObjectByType(successType);

    const body = JSON.stringify({
        data,
        message,
        error: false
    });

    return {
        statusCode,
        headers,
        body
    };
};

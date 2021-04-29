const _ = require('lodash');
const query = require('./query');
const {
    constructCustomErrorByType
} = require('./utils');

const processGet = async ({
    pathParameters,
    queryParameters,
    body,
    resource
}) => {
    try {
        let data = null;
        let responseType = `default`;

        if (resource === `vehicle` &&
            _.isEmpty(pathParameters) &&
            _.isEmpty(queryParameters) &&
            _.isEmpty(body)) { // get all
            
            responseType = `ITEM_FOUND`;
            data = await query.getAllVehicles();
        } else if (resource === `vehicle` &&
            _.isEmpty(queryParameters) &&
            _.isEmpty(body) &&
            pathParameters.hasOwnProperty('idVehicle')) {

            responseType = `ITEM_FOUND`;
            data = await query.getVehicleById(pathParameters.idVehicle);
        } else {
            constructCustomErrorByType(`FUNCTION_NOT_FOUND`);
        }

        return {
            data,
            type: responseType
        };
    } catch (e) {
        throw e;
    }
};

const processPut = async ({
    pathParameters,
    queryParameters,
    body,
    resource
}) => {
    try {
        let data = null;
        let responseType = `default`;

        console.log(`informacion para trabajar`, resource);
        console.log(pathParameters);
        console.log(body);

        if (resource === `vehicle` &&
            pathParameters.hasOwnProperty('idVehicle') &&
            body) {

            responseType = `ITEM_UPDATED`;
            data = await query.updateVehicleById(pathParameters.idVehicle, body);
        }

        return {
            data,
            type: responseType
        };
    } catch (e) {
        throw e;
    }
};

module.exports = {
    processGet,
    processPut
};

import _ from 'lodash';
import query from './query';
import {
    constructCustomErrorByType
} from './utils';

export const processGet = async ({
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

export const processPut = async ({
    pathParameters,
    queryParameters,
    body,
    resource
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

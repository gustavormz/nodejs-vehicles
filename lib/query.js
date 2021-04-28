import db from './db';
import {
    constructCustomErrorByType
} from './utils';
import vehiclesJson from '../vehicles.json';

const createVehicle = async vehicle => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: vehicle
    };
    return await db.put(params).promise();
};

const getAllVehicles = async () => {
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME
        };

        let vehiclesResponse = await db.query(params).promise();

        // if doesnt exist vehicles, create from json
        if (!dynamoResponse.Items ||
            dynamoResponse.Items.length === 0) {
            await Promise.all(vehiclesJson.map(async vehicle => await createVehicle(vehicle)));
            vehiclesResponse = vehiclesJson;
        }

        return vehiclesResponse.Items || vehiclesResponse;
    } catch (e) {
        constructCustomErrorByType(`ITEM_NOT_FOUND`);
    }
};

const getVehicleById = id => {
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: {
                id
            }
        };

        return await db.get(params).promise();
    } catch (e) {
        constructCustomErrorByType(`ITEM_NOT_FOUND`);
    } 
};

export default {
    getAllVehicles,
    getVehicleById
};

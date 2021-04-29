const fs = require('fs');
const db = require('./db');
const {
    constructCustomErrorByType
} = require('./utils');

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

        let vehiclesResponse = await db.scan(params).promise();

        // if doesnt exist vehicles, create from json
        if (!vehiclesResponse.Items ||
            vehiclesResponse.Items.length === 0) {
            const vehiclesRaw = fs.readFileSync('vehicles.json');
            const vehiclesJson = JSON.parse(vehiclesRaw);
            
            await Promise.all(vehiclesJson.map(async vehicle => await createVehicle({
                ...vehicle,
                id: vehicle.id.toString()
            })));
            vehiclesResponse = vehiclesJson;
        }

        return vehiclesResponse.Items || vehiclesResponse;
    } catch (e) {
        console.error(`Error getting from db`, e);
        constructCustomErrorByType(`ITEM_NOT_FOUND`);
    }
};

const getVehicleById = async id => {
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

const updateVehicleById = async (id, _body) => {
    try {
        const body = JSON.parse(_body);
        const UpdateExpression = `set #name = :name, #date = :date`;
        const ExpressionAttributeNames = {
            '#name': 'name',
            '#date': 'dateMaintenance'
        };
        const ExpressionAttributeValues = {
            ':name': body.name,
            ':date': body.dateMaintenance,
        };

        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: {
                id: id.toString()
            },
            UpdateExpression,
            ExpressionAttributeNames,
            ExpressionAttributeValues
        };

        return await db.update(params).promise();
    } catch (e) {
        console.error(`Error updating vehicle`, e);
        constructCustomErrorByType(`ITEM_NOT_UPDATED`);
    }
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    updateVehicleById
};

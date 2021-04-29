const AWS = require('aws-sdk');

// Update AWS config using my user created in IAM service
AWS.config.update({
  accessKeyId: process.env.DB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  region: process.env.DB_REGION,
});

// Create DynamoDB service object
const db = new AWS.DynamoDB.DocumentClient({
    apiVersion: "latest"
});

module.exports = db;

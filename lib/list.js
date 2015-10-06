var Promise = require("bluebird"),
    AWS     = require('aws-sdk'),
    debug    = require('debug')('awsm-users');

var dynamodb = new AWS.DynamoDB();
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

var verify = require('awsm-users').verify;

module.exports.listUsers = function() {
  return dynamodb.scanAsync({ TableName: process.env.USERS_TABLE });
}

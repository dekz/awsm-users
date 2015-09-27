var Promise = require("bluebird"),
    AWS     = require('aws-sdk'),
    debug    = require('debug')('awsm-users');

var dynamodb = new AWS.DynamoDB();
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

module.exports.run = function(event, context, cb) {
  action(event)
    .then(function(result) {
      cb(null, result);
    })
    .error(function(error) {
      debug('List Users Failed: %s', JSON.stringify(error));
      cb(error, null);
    });
};

var listUsers = function(user) {
  return dynamodb.scanAsync({ TableName: process.env.USERS_TABLE });
}

var action = function(event) {
  return listUsers(event);
};

var Promise = require("bluebird"),
    AWS     = require('aws-sdk'),
    debug    = require('debug')('awsm-users');

var dynamodb = new AWS.DynamoDB();
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

var verify = require('../lib/verify').verify

module.exports.run = function(event, context, cb) {
  return verify(event.Authorization)
    .then(action)
    .then(function(result) {
      cb(null, result);
    })
    .error(function(error) {
      debug('List Users Failed: %s', JSON.stringify(error));
      cb(error, null);
    });
};

var listUsers = function() {
  return dynamodb.scanAsync({ TableName: process.env.USERS_TABLE });
}

var action = function(event) {
  return listUsers();
};

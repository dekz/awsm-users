/**
 * AWS Module: Action: Modularized Code
 */

var Promise = require("bluebird");
var AWS = require('aws-sdk');
var crypto = require('crypto');
var util = require('util');

var dynamodb = new AWS.DynamoDB();
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  action(event)
    .then(function(result) {
      console.log('Done');
      cb(null, result);
    })
    .error(function(error) {
      console.log('Failed');
      cb(error, null);
    });
};

var listUsers = function(user, cb) {
  return dynamodb.scanAsync({ TableName: 'jaws-users' });
}

var action = function(event) {
  return listUsers(event);
};

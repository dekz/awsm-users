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
  action(event).then(function(result) {
    console.log('Created a new user');
    cb(null, result);
  }).catch(function(error) {
    console.log('Failed to create a new user');
    cb(error, null);
  });
};

var storeUser = function(user) {
  return dynamodb.putItemAsync({
    TableName: 'jaws-users',
    Item: {
      email:    { S: user.email },
      password: { S: user.password },
    },
    ConditionExpression: 'attribute_not_exists (email)'
  });
}

var action = function(event, cb) {
  return storeUser(event);
};

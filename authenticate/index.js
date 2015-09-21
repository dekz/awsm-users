/**
 * AWS Module: Action: Modularized Code
 */

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  return cb(null, action(event));
};

var AWS = require('aws-sdk');
var crypto = require('crypto');
var util = require('util');
var dynamodb = new AWS.DynamoDB();

var storeUser = function(user) {
  dynamodb.putItem({
    TableName: 'users',
    Item: {
      email:    { S: user.email },
      password: { S: user.password },
    },
    ConditionExpression: 'attribute_not_exists (email)'
  });
}

var action = function(event) {
  storeUser(event);
  return {message: 'You\'re JAWS lambda executed successfully!'};
};

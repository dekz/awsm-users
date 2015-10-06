var Promise  = require('bluebird'),
    AWS      = require('aws-sdk'),
    bcryptjs = require('bcryptjs'),
    moment   = require('moment'),
    uuid     = require('node-uuid'),
    debug    = require('debug')('awsm-users');

var dynamodb = new AWS.DynamoDB();
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

var validateInput = function(data) {
  return new Promise(function(resolve, reject) {
    resolve(data);
  });
}

var secureUser = function(user) {
  return new Promise(function(resolve, reject) {
    user.salt     = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(user.password, user.salt);
    resolve(user);
  });
}

var createUser = function(data) {
  return new Promise(function(resolve, reject) {
    var user = {
      id:       'u_' + uuid.v1(),
      email:    data.email,
      password: data.password,
      created:  moment().unix().toString(),
      updated:  moment().unix().toString(),
    }
    resolve(user);
  });
}

var storeUser = function(user) {
  debug('Saving ' + JSON.stringify(user));
  return dynamodb.putItemAsync({
    TableName: process.env.USERS_TABLE,
    Item: {
      id:       { S: user.id },
      email:    { S: user.email },
      password: { S: user.password },
      salt:     { S: user.salt },
      created:  { S: user.created },
      updated:  { S: user.updated },
    },
    ConditionExpression: 'attribute_not_exists (id)'
  });
}

module.exports.createUser = function(event) {
  return validateInput(event)
    .then(createUser)
    .then(secureUser)
    .then(storeUser);
};

var Promise  = require('bluebird'),
    AWS      = require('aws-sdk'),
    bcryptjs = require('bcryptjs'),
    moment   = require('moment'),
    uuid     = require('node-uuid'),
    debug    = require('debug')('awsm-users');

var dynamodb = new AWS.DynamoDB();
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

module.exports.run = function(event, context, cb) {
  return action(event)
    .then(function(result) {
      debug('Success: Created a user');
      cb(null, result);
    })
    .error(function(error) {
      debug('Failed: %s', JSON.stringify(error));
      cb(error, null);
    });
};

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
    TableName: 'jaws-users',
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

var action = function(event) {
  return validateInput(event)
    .then(createUser)
    .then(secureUser)
    .then(storeUser);
};

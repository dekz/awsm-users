var Promise  = require('bluebird'),
    AWS      = require('aws-sdk'),
    bcryptjs = require('bcryptjs'),
    jwt      = require('jsonwebtoken'),
    debug    = require('debug')('awsm-users');

var dynamodb = new AWS.DynamoDB();
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

module.exports.run = function(event, context, cb) {
  return action(event)
    .then(function(result) {
      debug('Success: Authentication');
      cb(null, { status: 201, jwt: result });
    })
    .error(function(error) {
      debug('Failed: %s', JSON.stringify(error));
      cb(null, { status: 400, message: 'Authentication Failed' });
    });
};

var getUser = function(data) {
  return [data, dynamodb.getItemAsync({
    TableName: 'jaws-users',
    Key: {
      email: { S: data.email }
    }
  })];
}

var authenticate = function(data, user) {
  var user = data[1],
      data = data[0];
  return new Promise(function(resolve, reject) {
    if (bcryptjs.compareSync(data.password, user.password)) {
      debug('successful auth compare');
      resolve(user);
    } else {
      debug('failed auth compare');
      reject(data);
    }
  });
}

var createToken = function(user) {
  return new Promise(function(resolve, reject) {
    var token = jwt.sign({
      uid: user.id,
    }, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
      expiresInSeconds: 10
    });

    resolve(token);
  });
}

var action = function(event) {
  return getUser(event)
    .then(authenticate)
    .then(createToken);
};

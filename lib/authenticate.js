var Promise  = require('bluebird'),
    AWS      = require('aws-sdk'),
    bcryptjs = require('bcryptjs'),
    jwt      = require('jsonwebtoken'),
    debug    = require('debug')('awsm-users');

var dynamodb = new AWS.DynamoDB();
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

var getUser = function(data) {
  return new Promise(function(resolve, reject) {
    dynamodb.getItemAsync ({
      TableName: process.env.USERS_TABLE,
      Key: {
        email: { S: data.email }
      }
    }).then(function(result) {
      if (result && 'Item' in result) {
        var user = {
          id:       result.Item.id.S,
          email:    result.Item.email.S,
          password: result.Item.password.S
        }
        resolve([data, user]);
      } else { reject(data) }
    });
  });
}

var authenticate = function(data, user) {
  var user = data[1],
      data = data[0];
  return new Promise(function(resolve, reject) {
    if (bcryptjs.compareSync(data.password, user.password)) {
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
      expiresInMinutes: 10
    });

    resolve(token);
  });
}

module.exports.authenticate = function(event) {
  return getUser(event)
    .then(authenticate)
    .then(createToken);
};

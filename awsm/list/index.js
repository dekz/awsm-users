var verify    = require('awsm-users').verify;
var listUsers = require('awsm-users').listUsers;

module.exports.run = function(event, context, cb) {
  return verify(event.Authorization)
    .then(listUsers)
    .then(function(result) {
      cb(null, result);
    })
    .error(function(error) {
      cb(error, null);
    });
};

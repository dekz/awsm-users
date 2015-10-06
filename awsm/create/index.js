var action = require('awsm-users').createUser;

module.exports.run = function(event, context, cb) {
  return action(event)
    .then(function(result) {
      debug('Success: Created a user');
      cb(null, result);
    })
    .error(function(error) {
      debug('Create User Failed: %s', JSON.stringify(error));
      cb(error, null);
    });
};

var action = require('awsm-users').createUser;

module.exports.run = function(event, context, cb) {
  console.log(action);
  return action(event)
    .then(function(result) {
      cb(null, result);
    })
    .error(function(error) {
      cb(error, null);
    });
};

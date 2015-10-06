var action = require('awsm-users').authenticate;

module.exports.run = function(event, context, cb) {
  return action(event)
    .then(function(result) {
      cb(null, { status: 201, jwt: result });
    })
    .error(function(error) {
      cb(null, { status: 400, message: 'Authentication Failed' });
    });
};

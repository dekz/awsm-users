var action = require('awsm-users').authenticate;

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

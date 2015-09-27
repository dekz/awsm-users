var Promise = require('bluebird'),
    jwt     = require('jsonwebtoken');

module.exports.verify = function(token) {
  return new Promise(function(resolve, reject) {
    jwt.verify(token, process.env.JWT_SECRET,function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    })
  });
}

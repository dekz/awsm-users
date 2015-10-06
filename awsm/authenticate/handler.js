'use strict';

require('jaws-core-js/env');

var action = require('./index.js');

module.exports.handler = function(event, context) {
  action.run(event, context, function(error, result) {
    return context.done(error, result);
  });
};

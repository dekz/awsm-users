var verify = require('./lib/verify.js').verify;

// relies on receiving an event with an auth object
// {auth: {user: <username>, token: <token>}, ….}

module.exports.Authorization = function (event, context, next){
	function reject(msg) {
		context.fail(msg);
	}
	if (event && event.auth && event.auth.token) {
		verify(event.auth.token, next, reject);
	} else {
		reject('No authentication token');
	}
}

## Awsm Users
AWSM Users is an example [awsm](https://github.com/awsm-org/awsm) module around the lifecycle of authentication.

### What does this project demonstatrate?
* Custom API endpoint request templates.
* Additional Cloudformation Resources (DynamoDB) and IAM roles
* Shared library code in `lib`
* [JWT](http://jwt.io/)
* Other HTTP Api endpoint methods

## Usage

### Asciicast
[![asciicast](https://asciinema.org/a/1wgq3i552t6229jbc8kdhqoy9.png)](https://asciinema.org/a/1wgq3i552t6229jbc8kdhqoy9)


In your JAWS project root directory, run:
```
jaws module install https://github.com/jaws-framework/jaws-core-js
jaws module install https://github.com/dekz/awsm-users
jaws deploy resources
jaws dash

# Create a User with a POST to <endpoint>/users/create
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
    "email": "jacob@jaws.com",
    "password": "password"
}' '<endpoint>/users/create'
# Authenticate a User with a POST to <endpoint>/users/authenticate. This returns a JWT token
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
    "email": "jacob@jaws.com",
    "password": "password"
}' '<endpoint>/users/authenticate'
# Hit the List endpoint which is behind an authentication wall
curl -H "Authorization: <jwt token>" "<your endpoint>/users/list" 
```

This will install the awsm modules into your project and save the resource creations into your cloudformation.  

DynamoDB Table Name: `jaws-users`


## Can I use this project in Production
No

## TODO
* [x] Create Users
* [x] List Users
* [x] Authenticate Users
* [ ] Delete Users

## Putting a lambda behind an authentication wall

Your API endpoint must pull out the Autheorization parameter and pass that through. Here is an example of a Request Template which pulls out the Auth token and sets it onto the `event`. See [list awsm.json](https://github.com/dekz/awsm-users/blob/master/list/awsm.json#L36)  
```json
      "RequestTemplates": {
        "application/json": "{\"Authorization\":\"$input.params('Authorization')\"}"
      }
```

Verify before doing any work in your Lambda, See [list lambda](https://github.com/dekz/awsm-users/blob/master/list/index.js#L10) as an example.  
```javascript
module.exports.run = function(event, context, cb) {
  return verify(event.Authorization)
    .then(action)
    .then(function(result) {
      cb(null, result);
    })
    .error(function(error) {
      debug('List Users Failed: %s', JSON.stringify(error));
      cb(error, null);
    });
};

```

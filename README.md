## Awsm Users

Small example framework for a [awsm](https://github.com/awsm-org/awsm) module.

Using a number of Lambdas for each operation alongside DynamoDB, this module will create and authenticate users.


## Usage

### Asciicast
[![asciicast](https://asciinema.org/a/1wgq3i552t6229jbc8kdhqoy9.png)](https://asciinema.org/a/1wgq3i552t6229jbc8kdhqoy9)


In your JAWS project root directory, run:
```
jaws module install https://github.com/jaws-framework/jaws-core-js
jaws module install https://github.com/dekz/awsm-users --save
jaws deploy resources
jaws dash
curl "<your endpoint>/users/list"
```

This will install the awsm modules into your project and save the resource creations into your cloudformation.  

DynamoDB Table Name: `jaws-users`


## Can I use this project in Production
No it is not secure.

## TODO
* [x] Create Users
* [x] List Users
* [ ] Authenticate Users
* [ ] Delete Users

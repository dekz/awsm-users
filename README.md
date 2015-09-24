## Awsm Users

Small example framework for a [awsm](https://github.com/awsm-org/awsm) module.

Using a number of Lambdas for each operation alongside DynamoDB, this module will create and authenticate users.

## Usage

In your JAWS project root directory, run:
```
jaws module install https://github.com/dekz/awsm-users --save
jaws deploy resources
jaws deploy lambda
jaws deploy endpoint
```

This will install the awsm modules into your project and save the resource creations into your cloudformation.  

DynamoDB Table Name: `jaws-users`

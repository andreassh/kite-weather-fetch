# README #

Readme for Kite Weather Fetch
This code is build as a script for fetching weather data for kite app

It requires the following ENV vars in .env file

```
NODE_ENV=development
PORT=4000
API_URL=http://localhost:1337
API_TOKEN=****
AWS_REGION=eu-central-1
```


## Development 


### 1. add dependencies

This project is dependent on submodules so you need to initially run

``` $ git submodule init```
``` $ git submodule update```

and install npm packages
```
$ yarn install
```

### 2. run local server:

```
$ yarn dev
```

server is now running on `http://localhost:4000` and ready ro run. 

an example on webhook request:

```
{
    "id": "someId",
}
```


## Build and deploy to AWS Lambda

### 1. build code
```
$ yarn build
```

Or

### 2. Create .Zip file for deploy upload to AWS lambda
``` 
$ yarn build:aws

```

### 4. Deploy to AWS
#### create stack (if not already created)
```
$ yarn:deploy
```

## Setting up Lambda function

#### create function

```
$ aws cloudformation deploy --template-file function-cloudformation.yml --stack-name kite-weather-fetch --capabilities
CAPABILITY_NAMED_IAM
```

#### update function

!!important if cloud function already exists use this instead
```
$ aws lambda update-function-code --function-name kite-weather-fetch --s3-bucket kite-weather-fetch --s3-key kite-weather-fetch.zip
```

5. Check deploy status (the latest event should say "ResourceStatus": "CREATE_COMPLETE".):

```
$ aws cloudformation describe-stack-events \
  --stack-name kite-weather-fetch
```

6. Trigger function
```
$ aws lambda invoke \
  --function-name kite-weather-fetch \
  --cli-binary-format raw-in-base64-out \
  --payload '{}' \
  function-result.json
```
results lies in function-result.json 
```
$ cat function-result.json
```

# testing locally

## 1. run yarn install
```
$ yarn install
```

## 2. Clone types lib into project:
```
 $ git clone git@bitbucket.org:hotcyborgballs/******.git
```

## 3. watch file change and compile
```
$ yarn start
```

OR

## 4. Build files
```
$ yarn build
```

## 5. Run script (from order id OR from bookID and character params) 

### Generate PDF from order id:
````
$ yarn run
```

e.g.
````
  $ yarn run
```




# Ingenico Connect Node.js example

**This SDK example has been rebranded to Worldline. As part of the rebranding the example has moved to https://github.com/Worldline-Global-Collect/connect-sdk-nodejs-example.**

## Introduction

The Node.js SDK example helps you to communicate with the [Ingenico Connect](https://epayments.developer-ingenico.com/) Server API. Its primary features are:

* an overview of all API calls
* examples of POST payloads
* example of how to integrate the SDK in a Node.js environment
* example on how to implement your own logger

See the [Ingenico ePayments Developer Hub](https://epayments.developer-ingenico.com/documentation/sdk/server/nodejs/) for more information on how to use the SDK.

## Structure of this repository

This repository consists out of three main components:

1. The webserver `server.js` and `/views/`
2. Example payloads: `/stubs/`
3. Example logger class: `/util/logger.js`

## Building the repository

1. From the root of the project install all dependencies: `npm install`.
2. Copy `config.json.dist` to `config.json` and replace the template values by actual values.
3. Run `node server.js`
4. Navigate to `http://localhost:<portnumber>/`

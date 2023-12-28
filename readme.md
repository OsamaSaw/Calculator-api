
# Basic calculator API

## Overview
Basic calculator API is a Node.js/Express application providing a basic calculator functionality with authentication.

## How to Run
1. Install dependencies: `npm install`
2. Start the server: `npm start` or `node app.js`
3. The server runs on `http://localhost:3000` 3000 is the default, unless its changed from the .env file 

## Routes
- POST `/api/add`: Adds two numbers
- POST `/api/sub`: Subtracts two numbers
- POST `/api/multiply`: Multiplies two numbers
- POST `/api/divide`: Divides two numbers

## Authentication
- Basic Auth: Access to routes requires basic authentication (username & password).
- Example: Username - `admin`, Password - `secret` (can be changed from the .env file)

## Security
- Rate limiter: preventing excess requests to the server to around 10 requests every 2 mins
- logger: logging every request made with its status code and every error separated and combined


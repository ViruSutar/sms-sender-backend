# Project Name - Send OTP 
### Description -
User can send random 6 Digits OTP to the number user provides

### Installing
* Clone the repository
* Run npm install to install the dependencies
* Create a .env file with the required environment variables
Run `npm start` to start the server
* use `npm test` run test cases

## Built With

* [Expressjs](https://expressjs.com/) - Express js is used to build this project

## Dependencies

- [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool designed to work in an asynchronous environment.
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
- [express-validator](https://www.npmjs.com/package/express-validator) - It is an middleware to validate data.
- [twilio](https://www.npmjs.com/package/twilio) - twilio is an SMS service used to send OTP.
- [winston](https://www.npmjs.com/package/winston) - winston is an logging library.
- [cors](https://www.npmjs.com/package/cors) - CORS is a nodejs package used to enable CORS.


## API Endpoints
- `POST /api/contacts/sendOTP`: Send an OTP to a mobile number.
- `POST /api/contacts/add`: adds a new contact
- `GET /api/contacts/list`: lists all the contacts
- `GET /api/contacts/getDetails`:gets the details of a specific contact
- `GET /api/contacts/listMessages`: lists all the OTP messages sent

## `/sendOTP`
### This endpoint sends an OTP to the specified mobile number. The request must include the following parameters:
- `mobileNumber`: The mobile number to which the OTP should be sent.
- `userId`: The ID of the user sending the OTP.
- `OTP`: The OTP to send.

### The response will be a JSON object with a message property indicating whether the OTP was sent successfully or not.

## `/add`
### This endpoint adds a new contact. The request must include the following parameters:
- `firstName` : The first name of the contact.
- `lastName` : The last name of the contact.
- `mobileNumber` : The mobile number of the contact.

### The response will be a JSON object with a message property indicating whether the contact was added successfully or not.

## `/list`
### This endpoint retrieves a list of all contacts. The response will be a JSON object with a contacts property containing an array of all contacts.

### Response :
```
"contacts": [
        {
            "_id": "63eb7f8ec734efe9e20de7c8",
            "firstName": "viraj",
            "lastName": "sutar"
        },
        {
            "_id": "63eb823c174244a6ad0177ee",
            "firstName": "jack",
            "lastName": "sparrow"
        },
        {
            "_id": "63ecf3f40face1fbabf7bd6e",
            "firstName": "jane",
            "lastName": "doe"
        }
    ]
```
## `/getDetails`
### This endpoint retrieves the details of a specific contact. The request must include the following parameter:
- `userId` - The ID of the contact to retrieve.

### Response
```
 "details": {
        "_id": "63eb7f8ec734efe9e20de7c8",
        "firstName": "viraj",
        "lastName": "sutar",
        "mobileNumber": 9768465336,
        "updatedAt": "2023-02-14T12:32:45.145Z",
        "createdAt": "2023-02-14T12:33:18.631Z",
        "__v": 0
    }
```

## `/listMessages`
### This endpoint retrieves a list of all messages sent. The response will be a JSON object with a data property containing an array of all messages sent.

### Response
```
"data": [
        {
            "_id": "63edc9e81330e40e17aa2703",
            "name": "viraj",
            "lastName": "sutar",
            "time": "2023-02-16 11:45",
            "OTP": 299958
        },
        {
            "_id": "63edc7341330e40e17aa26eb",
            "name": "viraj",
            "lastName": "sutar",
            "time": "2023-02-16 11:33",
            "OTP": 365300
        },
        {
            "_id": "63edc6d9770a4388d41f5236",
            "name": "viraj",
            "lastName": "sutar",
            "time": "2023-02-16 11:32",
            "OTP": 540260
        },
        ]
```

## Error Handling
### The API will return a JSON object with an error property if an error occurs. The error object will contain a message property describing the error.


## Environment Variables
### The API requires the following environment variables to be set:
- `TWILIO_ACCOUNT_SID` : The Account SID of your Twilio account.
- `TWILIO_AUTH_TOKEN`: The Auth Token of your Twilio account.
- `MONGO_URL`: The mongodb URL
- `PORT` : port number
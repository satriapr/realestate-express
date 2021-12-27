# Real-Estate Lead

This is a simple Real-Estate Lead generating platform REST API. Using Express, Typescript, and MongoDB.

## Demo
- https://streamable.com/3fomv7

## Technical overview

### I. Main dependency libraries
- [Mongoose](https://mongoosejs.com/): Mongo DB Object Modelling.
- [TypeScript](https://www.typescriptlang.org/): Typed language for Javascript. Reasons for using this:
    - Support OOP, e.g. classes, interfaces, inheritance. In my opinion this is good as project grows in size and complexity.
    - This gives code more structure and readable, hence speeds up debugging and refactoring.
- [Lodash](https://lodash.com/): functional library for general use.
- [Jest](https://jestjs.io/docs/en/getting-started): js testing framework.
- [ESLint](https://eslint.org/): Javascript linter for ES pattern.
- [Prettier](https://prettier.io/): Code formatter.
- Other supporting libraries, can be found in package.json.

### II. Source code architecture
- controllers folder: Controllers. Responsible for communication between client and service. Retrieve request, call service, and return response. Shouldn't contain business logic.
- constants folder: Constant.
- services: Responsible for serving what controllers need, contains query and business logic. Using Dependency Injection to be injected to controller.
- utils: Helper function.
- models: Schema structure.
- .test file: Unit testing.

### III. Run and Test

To run project (npm - http://localhost:5000):
```bash
npm i && npm run dev
```

To run project (docker - http://localhost:5000):
- Please let me know if docker is needed, I will prepare a docker image to run the project.

To run unit test:
```bash
npm test
```

To test API (via Postman, because we need pre-request script for generating auth signature):
- Download [Postman Canary](https://www.postman.com/downloads/canary/ "Postman Canary")
- Sign In / Create new account 
- Import collection (top left)
- Choose "Link" tab, and use this URL https://www.getpostman.com/collections/a54666cec8f7bf7c54f7
[![](https://i.ibb.co/znFQTRY/Screen-Shot-2021-12-27-at-6-17-17-PM.png)]([url=https://ibb.co/2nSW1tQ][img]https://i.ibb.co/znFQTRY/Screen-Shot-2021-12-27-at-6-17-17-PM.png[/img][/url] [url=https://imgbb.com/]alc promo code[/url])
- Import environment (top right, setting icon), choose file `trygobble.postman_environment.json` in root directory
- Choose the `trygobble` environment, and finally... Happy testing!

## What can be improved (this is not done because of time limit, also because of work load in current company)

### I. Feature
- Need to have pagination and total data in API
- Need more Entity to store Photos URL (assuming photos will be uploaded to cloud storage)
- Testing data need to be much more and more comprehensive, for performance testing, pagination testing, etc.

### II. Code and library
- API Documentation Should be better and interactive. Also need to specify the request and parameter type. E.g. using swagger.
- Need to have migration script for testing data.
- User password should be hashed.
- Currently using cloud MongoDB for easy setup
- Unit Test result:
![](https://i.ibb.co/nRWW8zq/Screen-Shot-2021-12-26-at-2-47-46-PM.png)
- Test cases currently only Unit Test in Controller. We can enhance by adding unit test in service too, and integration test. Integration test will be integrated with DB and check if data in DB really changed after API call. End to end test also needed in Production quality app.

## API Documentation
Note: Since Signature is needed, testing via POSTMAN is recommended, all request and response are available. Signature already handled in pre-request script. Please download both the Postman collections and Environment (for using variable like Salt).
I also add option to skip auth with `noAuth=1` parameter, in case it is needed. This also can be used if testing is done via CURL.

List of common Query String Parameter (for all url with prefix `/api`):
- `Signature` (string, required) -> MD5(timestamp + salt + URL)
- `clientTime` (timestamp, required) -> Client timestamp in unix format
- `name` (string, optional) -> for search by Entity name
- `noAuth` (boolean 1 or 0, optional) -> to bypass auth (Signature and clientTime) in case needed for testing

### Get SearchAll
Request:
```http
GET /api/searchall
```

```
curl --location --request GET 'http://localhost:5000/api/searchall?noAuth=1'
```

With Search (parameter `name`):
```
curl --location --request GET 'http://localhost:5000/api/cities?noAuth=1&name=a'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : [
    {
        "City": [
            {
                "_id": "61c8274bfd88d4b6c69abebb",
                "name": "Bangalore",
                "country": "India",
                "active": 1,
                "createdAt": "2021-12-26T08:26:51.091Z",
                "updatedAt": "2021-12-26T08:26:51.091Z",
                "__v": 0
            }
        ],
        "Project": [
            {
                "_id": "61c83ad59b143d62f8c172a6",
                "builder": {
                    "_id": "61c83373949f1aa2cf509ee0",
                    "name": "Singhousepro",
                    "description": "Experienced real estate developer with multiple projects"
                },
                "city": {
                    "_id": "61c826b1fd88d4b6c69abea9",
                    "name": "Abu Dhabi",
                    "country": "United Arab Emirates"
                },
                "name": "Abu Dhabi Project",
                "description": "This is a real estate development project with good location, cheap price, and many amenities",
                "type": "villas",
                "price": 200000,
                "location": "Abu Dhabi, Uni Arab Emirates",
                "amenities": "Free wifi, Smart Lock",
                "active": 1,
                "createdAt": "2021-12-26T09:50:13.765Z",
                "updatedAt": "2021-12-26T09:50:13.765Z",
                "__v": 0
            }
        ],
        "Builder": [
            {
                "_id": "61c833d3949f1aa2cf509ef3",
                "name": "Oxley Holdings",
                "description": "Experienced real estate developer with multiple projects",
                "active": 1,
                "createdAt": "2021-12-26T09:20:19.646Z",
                "updatedAt": "2021-12-26T09:20:19.646Z",
                "__v": 0
            },
        ]
    }
  ]
}
```

### Get Cities
Request:
```http
GET /api/cities
```

```
curl --location --request GET 'http://localhost:5000/api/cities?noAuth=1'
```

With Search (parameter `name`):
```
curl --location --request GET 'http://localhost:5000/api/cities?noAuth=1&name=a'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : [
    {
		"_id": "61c8274bfd88d4b6c69abebb",
		"name": "Bangalore",
		"country": "India",
		"active": 1,
		"createdAt": "2021-12-26T08:26:51.091Z",
		"updatedAt": "2021-12-26T08:26:51.091Z",
		"__v": 0
	},
  ]
}
```

### Store City
Request:
```http
POST /api/city
```

```
curl --location --request POST 'http://localhost:5000/api/city?noAuth=1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Chennai",
    "country": "India"
}'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : {}
```


### Delete City
Request:
```http
DELETE /api/city/:_id
```

```
curl --location --request DELETE 'http://localhost:5000/api/city/61c82f90e2f11a43f622d684?noAuth=1' \
--header 'Content-Type: application/json' \
--data-raw ''
```

Response:
```javascript
{
  "message" : "NO CONTENT",
  "statusCode" : 204,
  "data"    : {}
```

### Get Builders
Request:
```http
GET /api/builders
```

```
curl --location --request GET 'http://localhost:5000/api/builders?noAuth=1
```

With Search (parameter `name`):
```
curl --location --request GET 'http://localhost:5000/api/builders?noAuth=1&name=a'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : [
   	{
		   "_id": "61c72742685b9f3bcdf0cfd6",
		   "name": "Singhousepro",
		   "description": "Experienced real estate developer with multiple projects",
		   "active": 1,
		   "createdAt": "2021-12-25T14:14:26.374Z",
		   "updatedAt": "2021-12-25T14:14:26.374Z",
		   "__v": 0
	   }
  ]
}
```

### Store Builder
Request:
```http
POST /api/builder
```

```
curl --location --request POST 'http://localhost:5000/api/builder?noAuth=1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Singhousepro",
    "description": "Experienced real estate developer with multiple projects"
}'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : {}
```

### Delete Builder
Request:
```http
DELETE /api/builder/:_id
```

```
curl --location --request DELETE 'http://localhost:5000/api/builder/61c83373949f1aa2cf509ee0?noAuth=1' \
--header 'Content-Type: application/json' \
--data-raw ''
```

Response:
```javascript
{
  "message" : "NO CONTENT",
  "statusCode" : 204,
  "data"    : {}
```

### Get Projects
Request:
```http
GET /api/projects
```

```
curl --location --request GET 'http://localhost:5000/api/projects?noAuth=1
```

With Search (parameter `name`):
```
curl --location --request GET 'http://localhost:5000/api/projects?noAuth=1&name=a'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : [
   	{
            "_id": "61c838499b143d62f8c17291",
            "builder": {
                "_id": "61c833d3949f1aa2cf509ef3",
                "name": "Oxley Holdings",
                "description": "Experienced real estate developer with multiple projects"
            },
            "city": {
                "_id": "61c8274bfd88d4b6c69abebb",
                "name": "Bangalore",
                "country": "India"
            },
            "name": "Bangalore Project",
            "description": "This is a real estate development project with good location, cheap price, and many amenities",
            "type": "villas",
            "price": 200000,
            "location": "Bangalore, India",
            "amenities": "Free wifi, Smart Lock",
            "active": 1,
            "createdAt": "2021-12-26T09:39:21.040Z",
            "updatedAt": "2021-12-26T09:39:21.040Z",
            "__v": 0
        },
  ]
}
```

### Store Project
Request:
```http
POST /api/project
```

```
curl --location --request POST 'http://localhost:5000/api/project?noAuth=1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "builder": { "_id": "61c833d3949f1aa2cf509ef3" },
    "city": { "_id": "61c8274bfd88d4b6c69abebb" },
    "name": "Bangalore Project",
    "description": "This is a real estate development project with good location, cheap price, and many amenities",
    "type": "villas",
    "price": 200000,
    "location": "Bangalore, India",
    "amenities": "Free wifi, Smart Lock"
}'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : {}
```

### Delete Project
Request:
```http
DELETE /api/project/:_id
```

```
curl --location --request DELETE 'http://localhost:5000/api/project/61c83ad59b143d62f8c172a6?noAuth=1' \
--header 'Content-Type: application/json' \
--data-raw ''
```

Response:
```javascript
{
  "message" : "NO CONTENT",
  "statusCode" : 204,
  "data"    : {}
```

### Get Users
Request:
```http
GET /api/users
```

```
curl --location --request GET 'http://localhost:5000/api/users?noAuth=1
```

With Search (parameter `name`):
```
curl --location --request GET 'http://localhost:5000/api/users?noAuth=1&name=a'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : [
   	{
            "_id": "61c7313eaf52dd1cc55374b0",
            "fullName": "Mike Tyson",
            "role": "user",
            "email": "miket@example.com",
            "password": "BDr]G~K_t,7'A'2Z",
            "mobilePhone": "99998888",
            "active": 1,
            "createdAt": "2021-12-25T14:57:02.540Z",
            "updatedAt": "2021-12-25T14:57:02.540Z",
            "__v": 0
        }
  ]
}
```

### Store User
Request:
```http
POST /api/user
```

```
curl --location --request POST 'http://localhost:5000/api/user?noAuth=1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fullName": "Mike Tyson",
    "role": "user",
    "email": "miket@example.com",
    "password": "Password00",
    "mobilePhone": "99998888"
}'
```

Response:
```javascript
{
  "message" : "OK",
  "statusCode" : 200,
  "data"    : {}
```

### Delete User
Request:
```http
DELETE /api/user/:_id
```

```
curl --location --request DELETE 'http://localhost:5000/api/user/61c83e109b143d62f8c172b1 ?noAuth=1' \
--header 'Content-Type: application/json' \
--data-raw ''
```

Response:
```javascript
{
  "message" : "NO CONTENT",
  "statusCode" : 204,
  "data"    : {}
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
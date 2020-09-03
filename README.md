# Backend

## Development 
1. Make sure mongo is running, mongoose will connect to db named 'backend'
2. run npm install
3. from root of 'backend' directory, run `node app.js`

## Description
- Mongoose to model our main data: users and posts
- Authentication of user done on server, bcrypt to save enrypted passwords
- Different routes can handle different requests (GET/POST) from client
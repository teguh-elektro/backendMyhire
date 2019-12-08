require('dotenv/config');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const route = require('./src/routes')
const morgan = require('morgan')
var cors = require('cors')

const PORT = process.env.SVR_PORT;


server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cors())
/*
    build routs server
*/



server.listen(PORT, () => {
    console.log('the Server run on port', PORT);
});

server.use(morgan('dev'))
server.use('/', route)

module.exports = server


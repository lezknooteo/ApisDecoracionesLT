require('dotenv').config();

const Server=require('./model/server')
const server= new Server();

server.listen();

const port= 8093
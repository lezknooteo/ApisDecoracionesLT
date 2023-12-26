
const {Router}= require('express')

const route= Router();

const {getUser}= require('../controller/users')
const {getOneUser}= require('../controller/users')
const {postUser}= require('../controller/users')
const {putUser}= require('../controller/users')
const {deleteUser}= require('../controller/users')


route.get('/',getUser)
route.get('/:id',getOneUser)
route.post('/',postUser)
route.put('/:id',putUser)
route.delete('/:id',deleteUser)

module.exports = route
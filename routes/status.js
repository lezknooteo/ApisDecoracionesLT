
const {Router}= require('express')
const Validacion= require('../middleware/status')
const route= Router();

const {getStatus}= require('../controller/status')
const {getOneStatus}= require('../controller/status')
const {postStatus}= require('../controller/status')
const {putStatus}= require('../controller/status')
const {deleteStatus}= require('../controller/status')


route.get('/',getStatus)
route.get('/:id',getOneStatus)
route.post('/',Validacion,postStatus)
route.put('/:id',putStatus)
route.delete('/:id',deleteStatus)

module.exports = route
const {Router}= require('express')
const Validacion= require('../middleware/modules')

const route= Router();

const {getModule}= require('../controller/modules')
const {getOneModule}= require('../controller/modules')
const {postModule}= require('../controller/modules')
const {putModule}= require('../controller/modules')
const {deleteModule}= require('../controller/modules')


route.get('/',getModule)
route.get('/:id',getOneModule)
route.post('/',Validacion,postModule)
route.put('/:id',putModule)
route.delete('/:id',deleteModule)




module.exports = route
const {Router}= require('express')
const Validacion= require('../middleware/roles')

const route= Router();

const {getRol}= require('../controller/roles')
const {getOneRol}= require('../controller/roles')
const {postRol}= require('../controller/roles')
const {putRol}= require('../controller/roles')
const {deleteRol}= require('../controller/roles')


route.get('/',getRol)
route.get('/:id',getOneRol)
route.post('/',Validacion, postRol)
route.put('/:id', putRol)
route.delete('/:id',deleteRol)




module.exports = route
const {Router}= require('express')
const Validacion= require('../middleware/privileges')

const route= Router();

const {getPermiso}= require('../controller/permissions')
const {getOnePermiso}= require('../controller/permissions')
const {postPermiso}= require('../controller/permissions')
const {putPermiso}= require('../controller/permissions')
const {deletePermiso}= require('../controller/permissions')


route.get('/',getPermiso)
route.get('/:id',getOnePermiso)
route.post('/',Validacion, postPermiso)
route.put('/:id',putPermiso)
route.delete('/:id',deletePermiso)




module.exports = route
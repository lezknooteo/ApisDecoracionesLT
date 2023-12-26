
const {Router}= require('express')
const Validacion= require('../middleware/decorations')

const route= Router();

const {getDecoraciones}= require('../controller/decorations')
const {getOneDecoraciones}= require('../controller/decorations')
const {postDecoraciones}= require('../controller/decorations')
const {putDecoraciones}= require('../controller/decorations')
const {deleteDecoraciones}= require('../controller/decorations')


route.get('/',getDecoraciones)
route.get('/:id',getOneDecoraciones)
route.post('/',Validacion,postDecoraciones)
route.put('/:id',putDecoraciones)
route.delete('/:id',deleteDecoraciones)




module.exports = route
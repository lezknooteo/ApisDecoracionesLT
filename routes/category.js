const {Router}= require('express')
const Validacion= require('../middleware/category')

const route= Router();

const {getCategory}= require('../controller/category')
const {getOneCategory}= require('../controller/category')
const {postCategory}= require('../controller/category')
const {putCategory}= require('../controller/category')
const {deleteCategory}= require('../controller/category')


route.get('/',getCategory)
route.get('/:id',getOneCategory)
route.post('/',Validacion,postCategory)
route.put('/:id',putCategory)
route.delete('/:id',deleteCategory)




module.exports = route
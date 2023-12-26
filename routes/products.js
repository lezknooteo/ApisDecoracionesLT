const {Router}= require('express')
const Validacion= require('../middleware/products')

const route= Router();

const {getProducts}= require('../controller/products')
const {getOneProducts}= require('../controller/products')
const {postProducts}= require('../controller/products')
const {putProducts}= require('../controller/products')
const {deleteProducts}= require('../controller/products')

// const  {isAuthenticated}  = require('../controller/auth')

route.get('/',getProducts)
route.get('/:id',getOneProducts)
route.post('/',Validacion,postProducts)
route.put('/:id',putProducts)
route.delete('/:id',deleteProducts)


// route.get('/', isAuthenticated, getProducts)
// route.get('/:id',isAuthenticated, getOneProducts)
// route.post('/',isAuthenticated,Validacion, postProducts)
// route.put('/:id',isAuthenticated,Validacion, putProducts)
// route.delete('/:id',isAuthenticated, deleteProducts)



module.exports = route
const {Router}= require('express')
const Validacion= require('../middleware/foods')

const route= Router();

const {getFood}= require('../controller/foods')
const {getOneFood}= require('../controller/foods')
const {postFood}= require('../controller/foods')
const {putFood}= require('../controller/foods')
const {deleteFood}= require('../controller/foods')


route.get('/',getFood)
route.get('/:id',getOneFood)
route.post('/',Validacion,postFood)
route.put('/:id',putFood)
route.delete('/:id',deleteFood)




module.exports = route
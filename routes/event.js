const {Router}= require('express')
const Validacion= require('../middleware/Events/event')

const route= Router();

const {getEvent}= require('../controller/event')
const {getOneEvent}= require('../controller/event')
const {postEvent}= require('../controller/event')
const {putEvent}= require('../controller/event')
const {deleteEvent}= require('../controller/event')


route.get('/',getEvent)
route.get('/:id',getOneEvent)
route.post('/',postEvent)
route.put('/:id',putEvent)
route.delete('/:id',deleteEvent)




module.exports = route
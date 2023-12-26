const Foods  = require("../model/foods");

const validation= async(req, res, next)=>{
  const {name, description, price, stateId}= req.body

  if(!name){
    res.status(400).json({error: 'nombre requerido'})
    return
  }
  if(!description){
    res.status(400).json({error: 'descripcion requerido'})
    return
  }
  if(!price){
    res.status(400).json({error: 'precio requerido'})
    return
  }

  if(price<=0){
    res.status(400).json({error: 'precio debe ser mayor a 1'})
    return
  }

  if(!stateId){
    res.status(400).json({error: 'estado requerido'})
    return
  }

  next();
}

module.exports= validation
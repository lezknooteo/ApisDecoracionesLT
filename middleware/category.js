const  Category  = require("../model/category");

const validation= async(req, res, next)=>{
  const {name, description, stateId}= req.body

  if(!name){
    res.status(400).json({error: 'nombre requerido'})
    return
  }
  if(!description){
    res.status(400).json({error: 'descripcion requerido'})
    return
  }
  if(!stateId){
    res.status(400).json({error: 'estado requerido'})
    return
  }

  next();
}

module.exports= validation
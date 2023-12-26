const  Module  = require("../model/modules");

const validation= async(req, res, next)=>{
  const {name, stateId}= req.body

  if(!name){
    res.status(400).json({error: 'nombre requerido'})
    return
  }
 

  if(!stateId){
    res.status(400).json({error: 'estado requerido'})
    return
  }

  next();
}

module.exports= validation
const Status  = require("../model/status");

const validation= async(req, res, next)=>{
  const {name}= req.body

  if(!name){
    res.status(400).json({error: 'nombre requerido'})
    return
  }

  next();
}

module.exports= validation
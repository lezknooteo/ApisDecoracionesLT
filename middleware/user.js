const User  = require("../model/user");

const validation= async(req, res, next)=>{
  const {name, last_name, mail, password, stateId, rolId }= req.body

  if(!name){
    res.status(400).json({error: 'nombre requerido'})
    return
  }
  if(!last_name){
    res.status(400).json({error: 'apellido requerido'})
    return
  }
  if(!mail){
    res.status(400).json({error: 'direccion de correo electronico requerido'})
    return
  }
  if(!password){
    res.status(400).json({error: 'contraseña requerido'})
    return
  }

  if(!stateId){
    res.status(400).json({error: 'estado requerido'})
    return
  }

  if(!rolId){
    res.status(400).json({error: 'estado requerido'})
    return
  }

  next();
}

module.exports= validation
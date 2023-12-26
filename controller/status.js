const { response } = require('express');

const   Status = require('../model/status')


const getStatus = async (req, res = response) => {
    let mensaje = ''
    try {
        const status = await Status.findAll()
        console.log('buenas noches amigos'+ status)
        mensaje = status
    } catch (error) {
        mensaje = error
    }
    res.json({
        msg: mensaje
    })
}

const getOneStatus = async (req, res = response) => {
    let mensaje = ''
    try {
        const id = req.params.id
        const status = await Status.findOne({ where: { id: id } })
        mensaje = status
    } catch (error) {
        mensaje = error
    }
    res.json({
        msg: mensaje
    })
}


const postStatus = async (req, res = response) => {
    const body = req.body
    try {
        await Status.create(body)
        mensaje = 'estado creado con exito'
    } catch (error) {
        mensaje = error
    }
    res.json({
        mensaje
    })
}

const putStatus = async (req, res = response) => {
    const body = req.body
    try {
        await Status.update(body, { where: { id: body.id } })
        mensaje = 'Categoria modificada con exito'
    } catch (error) {
        mensaje = error
    }
    res.json({
        mensaje
    })
}

const deleteStatus = async (req, res = response) => {
    const body = req.body
    try {
        await Status.destroy({ where: { id: body.id } })
        mensaje = 'CAtegoria eliminada con exito'
    } catch (error) {
        mensaje = error
    }
    res.json({
        mensaje
    })
}


module.exports = {
    getStatus,
    getOneStatus,
    postStatus,
    putStatus,
    deleteStatus
}
const {createUserValidation} = require('../helpers/validators')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {findById, findOneForEmail} = require('../controllers/user.controller')

function createUserMiddleware(req, res, next){
    const validationResult = createUserValidate(req.body)
    if (validationResult.valid){
        next()
    } else {
        res.status(400).json({msg: validationResult.message})
    }
}

function validEmailMiddleware(req, res, next){
    if (req.body.email.includes('@')){
        next()
    } else {
        res.status(400).json({msg: 'email is not valid'})
    }
}

function isLogged(req, res, next){
    if (req.query.token){
        try{
            const result = jwt.verify(req.querry.token, process.env.JWTSECRET)
            if (result.id === req.params.id){
                next()
            } else {
                res.status(401).json({msg: 'permission denied'})
            }
        } catch(error){
            res.status(401).json({msg: 'token not valid'})
        }
    } else {
        res.status(400).json({msg: 'missed token'})
    }
}

async function isAdmin(req, res, next){
    if (req.query.token){
        try{
            const result = jwt.verify(req.query.token, process.env.JWTSECRET)
            const userFound = await findById(result.id)
            if (userFound.role === 'admin'){
                next()
            } else {
                res.status(403).json({msg: 'permission denied'})
            }
        } catch(error){
            res.status(401).json({msg: 'token not valid'})
        }
    } else {
        res.status(400).json({msg: 'missed token'})
    }
}

async function duplicatedEmail (req, res, next){
    const duplicateUserEmail = await findOneForEmail(req.body.email)
    if (duplicateUserEmail){
        res.status(400).json({msg: 'duplicated email'})
    } else {
        next()
    }
}

module.exports = {
    createUserMiddleware,
    validEmailMiddleware,
    isLogged,
    isAdmin,
    duplicatedEmail
}
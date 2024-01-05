const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {encrypt, checkup} = require('../helpers/encriptation')

async function findAll(){
    const users = await User.find()
    return users
}

async function findAllForEmail(email){
    const users = await User.find(email)
    return users
}

async function findOneForEmail(email){
    const userFound = await User.findOne(email)
    return userFound
}

async function findById(id){
    const userFound = await User.findById(id)
    return userFound
}

async function createUser(name, lastName, email, password, role){
    const hash = await encrypt(password)
    const newUser = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: hash,
        role: role,
    })
    await newUser.save()
    return newUser
}

async function login(email, password){
    const userFound = await User.findOne(email)
    if (userFound) {
        const matchResult = await checkup(userFound.password)
        if (matchResult) {
            const token = jwt.sign({id: userFound._id, name: userFound.email}, process.env.JWTSECRET, {expiresIn: '1h'})
            return {
                user: userFound,
                token: token,
                msg: null,
            }
        } else {
            return {
                user: null,
                token: null,
                msg: 'wrong password'
            }
        }
    } else {
        return {
            user: null,
            token: null,
            msg: 'email not found'
        }
    }
}

module.exports  = {
    findAll,
    findAllForEmail,
    findOneForEmail,
    findById,
    createUser,
    login
}
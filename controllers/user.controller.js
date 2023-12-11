const Book = require('../models/user.model')

async function findAll(){
    const users = await User.find()
    return users
}

async function findById(id){
    const userFound = await USer.findById(id)
    return userFound
}

async function createUser(name, lastName, email, password){
    const newUser = new User({
        name,
        lastName,
        email,
        password
    })
    await newUser.save()
    return newUser
}

module.exports  = {
    findAll,
    findById,
    createUser
}
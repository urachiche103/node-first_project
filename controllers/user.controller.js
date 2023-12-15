const User = require('../models/user.model')

async function findAll(){
    const users = await User.find()
    return users
}

async function findById(id){
    const userFound = await User.findById(id)
    return userFound
}

async function createUser(name, lastName, email, password){
    const newUser = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
    })
    await newUser.save()
    return newUser
}

module.exports  = {
    findAll,
    findById,
    createUser,
}
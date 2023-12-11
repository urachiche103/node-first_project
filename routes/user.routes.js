const express = require('express')
const router = express.Router()

const {findAll, findById, createUser} = require('../controllers/user.controller.js')

const User = require('../models/user.model')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const userFound = await User.findById(req.params.id)
    if (userFound) {
        res.json(userFound)
    } else {
        res.json({msg: 'error: user not found'})
    }
})

router.post('/', async (req, res) => {
    if (req.body.email === undefined || req.body.email.trim() === '') {
        res.json({msg: 'error: email is missing'})
    } else {
        const newUser = new User ({
            email: req.body.email,
            password: req.body.password,
        })
        await newUser.save()
        res.json({msg: 'created user'})
    }
})

module.exports = router
const express = require('express')
const router = express.Router()

const {findAll, findById, createUser} = require('../controllers/user.controller.js')
const User = require('../models/user.model')

router.get('/', async (req, res) => {
    const users = await findAll()
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const userFound = await findById(req.params.id)
    if (userFound) {
        res.json(userFound)
    } else {
        res.json({msg: 'error: user not found'})
    }
})

router.post('/', async (req, res, next) => {
    await createUser(
        req.body.name,
        req.body.lastName,
        req.body.email,
        req.body.password)
    res.json({msg: 'user created'})
})

module.exports = router
const express = require('express')
const router = express.Router()

const {findAll, findAllForEmail, findById, createUser, login} = require('../controllers/user.controller.js')
const {createUserMiddleware, validEmailMiddleware, duplicatedEmail, isLogged, isAdmin} = require('../middlewares/user.middleware.js')

// const User = require('../models/user.model')

router.get('/', async (req, res) => {
    try {
        const users = []
        if (req.query.email){
            users = await findAllForEmail(req.query.email)
        } else {
            users = await findAll()
        }
        res.json(users)
    } catch (error){
        res.status(500).json({msg: 'server internal error'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const userFound = await findById(req.params.id)
        if (userFound){
            res.json(userFound)
        } else {
            res.status(404).json({msg: 'error: urser not found'})
        }
    } catch (error){
        res.status(500).json({msg: 'server internal error'})
    }
})

router.get('/private-zone/profile/:id', isLogged, async (req, res) => {
    const userFound = await findById(req.params.id)
    res.json({msg: 'welcome to your profile ' + userFound.email})
})

router.get('/admin-zone/home', isAdmin, async (req, res) => {
    res.json({msg: 'welcome admin'})
})

router.post('/', createUserMiddleware, validEmailMiddleware, duplicatedEmail, async (req, res) => {
    try {
        await createUser(req.body.name.trim(), req.body.lastName.trim(), req.body.email.trim(), req.body.password, req.body.role)
        res.json({msg: 'user created'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'server internal error'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.email, req.body.password)
        res.json({token: result.token, msg: result.msg})
    } catch (error){
        res.status(500).json({msg: 'server internal error'})
    }
})

module.exports = router
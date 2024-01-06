const express = require('express')
const router = express.Router()

const {findAll, findAllContent, findById, createBook, deleteBook, modifyBook} = require('../controllers/book.controller')

const {createBookValidation} = require('../helpers/validators')

router.get('/', async (req, res) => {
    try {
    const books = await findAll()
    res.json(books)
    } catch (error) {
        console.log(String(error))
        res.status(500).json({msg: 'internal error'})
    }
})

router.get ('/', async (req, res) => {
    try {
        let books = []
        if (req.query.hasAnAuthor || req.query.hasCountry || req.query.hasLanguage || req.query.hasTitle || req.query.hasYear){
            const author = req.query.hasAnAuthor ? req.query.hasAnAuthor : ''
            const country = req.query.hasCountry ? req.query.hasCountry : ''
            const language = req.query.hasLanguage ? req.query.hasLanguage : ''
            const title = req.query.hasTitle ? req.query.hasTitle : ''
            const year = req.query.hasYear ? req.query.hasYear : ''
            books = await findAllContent(author, country, language, title, year)
        } else {
            books = await findAll()
        }
        res.json(books)
    } catch (error){
        console.log(String(error))
        res.status(500).json({msg: 'internal error'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const bookFound = await findById(req.params.id)
        if (bookFound) {
            res.json(bookFound)
        } else {
            res.status(404).json({msg: 'error: book not found'})
        }
    } catch (error) {
        res.status(500).json({msg: 'internal error' + String(error)})
    }
})

router.post('/', async (req, res) => {
    await createBook(
        req.body.author.trim(),
        req.body.country.trim(),
        req.body.language.trim(),
        req.body.pages,
        req.body.title.trim(),
        req.body.year)
    res.json({msg: 'book created'})
})

router.delete('/:id', async (req, res) => {
    const bookDeleted = await deleteBook(req.params.id)
    if (bookDeleted) {
        res.json({msg: 'book deleted'})
    } else {
        res.json({msg: 'error: book not found'})
        }
})

router.put('/:id', async (req, res) => {
    const found = null
    const msg = []
    const validationResult = createBookValidation(req.body)
    if (!validationResult.valid){
        res.status(400).json({msg: validationResult.message})
    } else {
        found = await modifyBook(
            req.params.id,
            req.body.author.trim(),
            req.body.country.trim(),
            req.body.language.trim(),
            req.body.pages,
            req.body.title.trim(),
            req.body.year)
        res.json(found === null ? {msg: 'error: book not found'} : {data: found, message: msg})
    }
})

router.patch('/:id', async (req, res) => {
    const found = null
    const msg = []
    found = await modifyBook(
        req.params.id,
        req.body.author.trim(),
        req.body.country.trim(),
        req.body.language.trim(),
        req.body.pages,
        req.body.title.trim(),
        req.body.year)
    res.json(found === null ? {msg: 'error: book not found'} : {data: found, message: msg})
})

module.exports = router
const express = require('express')
const router = express.Router()

const {findAll, findById, createBook, deleteBook, modifyBook} = require('../controllers/book.controller.js')
const {validateCreateBook} = require('../helpers/validators.js')

router.get('/', async (req, res) => {
    try {
    const books = await findAll()
    res.json(books)
    } catch (error) {
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
        req.body.author.thrim(),
        req.body.country.thrim(),
        req.body.language.thrim(),
        req.body.pages,
        req.body.title.thrim(),
        req.body.year
        )
    res.json({msg: 'book created'})
})

router.delete('/:id', async (req, res) => {
    const deletedBook = await deleteBook(req.params.id)
    if (deletedBook) {
        res.json({msg: 'error: book not found'})
    }
})

router.put('/:id', async (req, res) => {
    const found = null
    const msg = []
    const validationResult = validateCreateBook(req.body)
    if (!validationResult.valid) {
        res.status(400).json({msg: validationResult.message})
    } else {
        found = await modifyBook(
            req.params.id,
            req.body.author,
            req.body.country,
            req.body.language,
            req.body.pages,
            req.body.title,
            req.body.year)
        res.json(found === null ? {msg: 'error: book not found'} : {data: found, messsage: msg})
    }
})

router.patch('/:id', async (req, res) => {
    const found = null
    const msg = []
    found = await modifyBook(
        req.params.id,
        req.body.author,
        req.body.country,
        req.body.language,
        req.body.pages,
        req.body.title,
        req.body.year)
    res.json(found === null ? {msg: 'error: book not found'} : {data: found, message: msg})
})

module.exports = router
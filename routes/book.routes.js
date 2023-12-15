const express = require('express')
const router = express.Router()

const {findAll, findById, createBook, deleteBook} = require('../controllers/book.controller')

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

router.post('/', async (req, res, next) => {
    await createBook(
        req.body.author,
        req.body.country,
        req.body.language,
        req.body.pages,
        req.body.title,
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

module.exports = router
const Book = require('../models/book.model')

async function findAll(){
    const books = await Book.find()
    return books
}

async function findById(id){
    const bookFound = await Book.findById(id)
    return bookFound
}

async function createBook(author, country, language, pages, title, year){
    const newBook = new Book({
        author: author,
        country: country,
        language: language,
        pages: pages,
        title: title,
        year: year,
    })
    await newBook.save()
    return newBook
}

async function deleteBook(id){
    const bookDeleted = await Book.findByIdAndDelete(id)
    return bookDeleted
}

module.exports  = {
    findAll,
    findById,
    createBook,
    deleteBook,
}
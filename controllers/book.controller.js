const Book = require('../models/book.model')

async function findAll(){
    const books = await Book.find()
    return books
}

async function findAllContent(author, country, language, title, year){
    const books = await Book.find({author: {'$regex': author, '$options': 'i'},
        country: {'$regex': country, '$options': 'i'},
        language: {'$regex': language, '$options': 'i'},
        title: {'$regex': title, '$options': 'i'},
        year: {'$regex': year, '$options': 'i'}})
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
        year: year
    })
    await newBook.save()
    return newBook
}

async function deleteBook(id){
    const bookDeleted = await Book.findByIdAndDelete(id)
    return bookDeleted
}

async function modifyBook(id, author, country, language, pages, title, year){
    const modifiedBook = await Book.findByIdAndUpdate(id, {author, country, language, pages, title, year})
    return modifiedBook
}

module.exports  = {
    findAll,
    findAllContent,
    findById,
    createBook,
    deleteBook,
    modifyBook
}
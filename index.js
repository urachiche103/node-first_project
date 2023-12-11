const express = require('express')
const bodyParser = require('body-parser')
const bookRouter = require('./routes/book.routes')
const userRouter = require('./routes/user.routes')
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://urachiche103:rtWR8FZyIwwZCY23@cluster0.dlvfirs.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to database!'))
    .catch(err => console.log('err'));

app.use('/books', bookRouter)
app.use('/users', userRouter)

app.listen(3000)


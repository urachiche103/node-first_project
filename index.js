require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const bookRouter = require('./routes/book.routes')
const userRouter = require('./routes/user.routes')
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(process.env.URL)
    .then(() => console.log('Connected to database!'))
    .catch(err => console.log('err'));

app.use('/books', bookRouter)
app.use('/users', userRouter)

app.listen(process.env.PORT)
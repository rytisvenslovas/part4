const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Blog = require('./models/blog')
const blogsRouter = require('./controlers/blogs')
const usersRouter = require('./controlers/users')
const config = require('./utils/config')
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })




app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)


module.exports = app
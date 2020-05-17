const mongoose = require('mongoose')




const blogSchema = mongoose.Schema({
    id: Object,
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  
  


  module.exports = mongoose.model('Blog', blogSchema)
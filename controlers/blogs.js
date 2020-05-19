const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const objectId = require('mongodb').ObjectID


blogsRouter.get('/', async (req, res)=>{
    const blogs = await Blog.find({})
    res.json(blogs.map(blog=>blog.toJSON()))
    
})

blogsRouter.post('/', async  (req, res, next)=>{
    const body = req.body
    if(!body.title || !body.url){
        return  res.status(400).json(console.log('title or url is missing'))
    }else {
        const blog = new Blog({
            title:body.title,
            author:body.author,
            url:body.url,
            likes:body.likes
        })
    
       await blog.save().then(savedBlog=>{
            res.json(savedBlog.toJSON())
        }).catch(error=>next(error))
    }
    
})

blogsRouter.put('/:id', async (req, res , next)=>{
    await Blog.updateOne({"_id": objectId(req.params.id)},{$set :{"likes": 0}})
    
})

module.exports = blogsRouter


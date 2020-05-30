const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const objectId = require('mongodb').ObjectID


blogsRouter.get('/', async (req, res)=>{
    const blogs = await Blog.find({}).populate('user', {username:1,name:1})
    res.json(blogs.map(blog=>blog.toJSON()))
    
})

blogsRouter.post('/', async  (req, res, next)=>{
    const body = req.body
    const user = await User.findById(body.userId)
    if(!body.title || !body.url){
        return  res.status(400).json(console.log('title or url is missing'))
    }else {
        const blog = new Blog({
            title:body.title,
            author:body.author,
            url:body.url,
            likes:body.likes,
            user: user._id
        })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
       
    }  
})


blogsRouter.post('/:id', async (req, res , next)=>{
    await Blog.updateOne({"_id": objectId(req.params.id)},{$set :{"likes": 0}})
    res.sendStatus(200).end()
    
})


blogsRouter.delete('/:id', async (req, res , next )=>{
    await Blog.deleteOne({"_id": objectId(req.params.id)})
    res.sendStatus(204).end()
})

blogsRouter.put('/:id', async (req, res , next)=>{
    await Blog.update({"_id": objectId(req.params.id)},{$inc :{"likes": +1}})
    res.sendStatus(200).end()
    
})

blogsRouter.post('/api/users', async (req , res , next)=> {
    
})


module.exports = blogsRouter
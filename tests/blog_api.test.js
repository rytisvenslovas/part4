const mongoose = require('mongoose')
const objectId = require('mongoose').objectID
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

let length = 0
const initialiseBlogs = async() => {
    const blogs = await Blog.find({})
    length = blogs.length


}
initialiseBlogs()

test('returns the correct amount of blog posts in the JSON format', async () => {
        const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)


        expect(response.body).toHaveLength(length)
})

test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    response.body.forEach(element => {
        expect(element.id).toBeDefined()
    });
})

test('verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
    const newBlogPost = {
        title: 'new blog post title test',
        author: 'test author',
        url: 'test url',
        likes: 25,
        id: 'test1213'
    }
    
    await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)
const response = await api.get('/api/blogs')

expect(response.body).toHaveLength(length + 1)

})


test('swx', async () => {
    const updatedPost = {
        likes: 0
    }
    
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    response.body.forEach( async element => {
        if(element.hasOwnProperty('likes')){
            console.log(element.title, 'has property likes')
            
            }else{
                console.log(element.title, 'DOES NOT HAVE property likes', element.id , ' updating...')
                await api.put(`/api/blogs/${element.id}`)
               
               
            }
    });
    const blogs = await Blog.find({})
    
})

afterAll(()=>{
    mongoose.connection.close()
})
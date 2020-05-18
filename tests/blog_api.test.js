const mongoose = require('mongoose')
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



afterAll(()=>{
    mongoose.connection.close()
})
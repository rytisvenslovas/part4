const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogsRouter = require('../controlers/blogs')

const api = supertest(app)








test('amount of blog posts', async()=>{
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(res.body.length)
})

afterAll(()=>{
    mongoose.connection.close()
})
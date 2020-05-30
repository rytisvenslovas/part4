const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require ('../models/user')


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


test('verifies that if the likes property is missing from the request', async () => {
    
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    response.body.forEach( async element => {
        if(element.hasOwnProperty('likes')){
            console.log(element.title, 'has property likes')
            
            }else{
                console.log(element.title, 'DOES NOT HAVE property likes', element.id , ' updating...')
                await api.post(`/api/blogs/${element.id}`)
               
               
            }
    });
    const blogs = await Blog.find({})
    
})

test('verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async ()=>{
    const newBlogPost = {
        author: 'test author',
        likes: 25,
        id: 'test1213'
    }
    
    await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)

})


test('way to create new users by doing a HTTP POST-request to address api/users',async ()=> {
    const newUser = {
        username: 'test',
        name: 'testname',
        password: 'testpassword'
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

})


test('check that invalid users are not created and invalid add user operation returns a suitable status code and error message', async ()=>{
    const newUser = {
        username: 't',
        name: 'tesst',
        password: 't'
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    
})

afterAll(()=>{
    mongoose.connection.close()
})
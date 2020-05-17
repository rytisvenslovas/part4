const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

const api = supertest(app)




test('amount of blog posts', async()=>{
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(res.body.length)
})


test('verify id', async()=>{
    const res = await api.get('/api/blogs')
    const properties = res.body.map(r=>Object.keys(r))
    let count = 0
    for(i=0; i<properties.length; i++ ){
      if(properties[i][0].toString() === 'id' ){
        count++
      }
    }
    if(count === properties.length){
        console.log('all id properties named : id')
    }else{
        console.log('not all properties named : id')
    }

    console.log('count: ', count, "i: ", i , properties.length)

    expect(properties).toHaveLength(count)
})



afterAll(()=>{
    mongoose.connection.close()
})
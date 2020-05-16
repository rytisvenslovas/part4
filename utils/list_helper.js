var _ = require('lodash')


const dummy = (blog) => {
    return 1
  }
  
const totalLikes = (blog) => {
    const reducer = (sum, likes)=>{
        return sum + likes.likes
    }
    return blog.reduce(reducer,0) 
}  

const favoriteBlog = (blog) => {
    const maxLikes = blog.map((most)=>{
        return most.likes
    }) 
    const post = blog.find((el)=>{
        return el.likes === Math.max.apply(null, maxLikes)
     })
     const result = {
        title: post.title,
        author: post.author,
        likes: post.likes
     }
    console.log('favorite blog', result)
    return result
}

const mostBlogs = (blog) =>{
    const array = []
    const  count = _.countBy(blog, value => value.author)
    const values = _.values(count)
    const names = Object.keys(count)
    const max = _.maxBy(values, value => value)
    const index = _.indexOf(values, max)
    const result = {
            author: names[index],
            blogs: max
    }
    
    
  console.log('most blogs' , result)

  return result
  
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }

 
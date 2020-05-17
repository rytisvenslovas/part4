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

const mostLikes = (blog) => {
    const  group = _.groupBy(blog, value => value.author)
    const values = _.values(group)
    const names = Object.keys(group)
    const countLikes = [] 
    for (i=0;i<values.length; i++ ){
        countLikes.push(_.sumBy(values[i], value => value.likes))
    }
    const max = _.maxBy(countLikes, value => value)
    const index = _.indexOf(countLikes, max)
    const result = {
        author: names[index],
        likes: max
    }
    console.log(result)
    return result 

}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }

 
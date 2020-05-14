
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
    const numbers = blog.map((most)=>{
        return most.likes
    }) 
    const result = blog.find((el)=>{
        return el.likes === Math.max.apply(null, numbers)
     })
    console.log(result)
    return Math.max.apply(null, numbers)
}
  

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

 
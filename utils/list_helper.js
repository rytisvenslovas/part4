
const dummy = (blog) => {
    return 1
  }
const totalLikes = (blog) => {
    const reducer = (sum, likes)=>{
        return sum + likes.likes
    }
    return blog.reduce(reducer,0) 
}  
  module.exports = {
    dummy,
    totalLikes
  }
const dummy = (blogs) => {
    if(blogs instanceof Array){
        return 1
    }
}

const totalLikes = (blogs)=>{
    const reducer = (sum, item) => {
        return sum + item
    }
    const likesNum = blogs.map((item)=>item.likes)

    return likesNum.reduce(reducer, 0)

}

const favoriteBlog = (blogs)=>{
    const likesNum = blogs.map((item)=>item.likes)
    const topLike = likesNum.indexOf(Math.max(...likesNum))
    const topContent = {
        title:blogs[topLike].title,
        author:blogs[topLike].author,
        likes:blogs[topLike].likes
    }
    return topContent

}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
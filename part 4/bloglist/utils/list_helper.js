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
  
module.exports = {
    dummy,
    totalLikes
}
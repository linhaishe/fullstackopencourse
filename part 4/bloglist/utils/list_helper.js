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

const mostBlogs =(blogs)=>{
    const authors = blogs.map((item)=>item.author)
    let max=null//定义一个用来存储出现次数最多的元素
    let num=1//定义一个用来存储最出现的次数
    authors.reduce((p,k)=>{ 
        //对该数组进行reduce遍历
        p[k]?p[k]++:p[k]=1
        if(p[k]>num){
            num=p[k]
            max=k
        }
        return p
    },{})
    return {author:max,blogs:num}
}

// const mostBlogs =(blogs)=>{
//     const authors = blogs.map((item)=>item.author)
//     const mostBlogsCount = {}
//     let i = 0, len = authors .length
//     for (; i < len; i++) {
//         const author = authors [i]
//         const counts = mostBlogsCount[author]
   
//         if (counts) {
//             mostBlogsCount[author] += 1
//         } else {
//             mostBlogsCount[author] = 1
//         }
//     }
//     const topAuthorIndex = Object.values(mostBlogsCount).indexOf(Math.max(...Object.values(mostBlogsCount)))
//     return mostBlogsCount[topAuthorIndex]
// }

// function countTimes(data) {
//     var obj = {}
//     return data.reduce(function(time, name) {
//         if (name in time) {
//             time[name]++
//         } else {
//             time[name] = 1
//         }
//         return time
//     }, {})
// }

//countTimes([1,1,1,2,3,3,2])

  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
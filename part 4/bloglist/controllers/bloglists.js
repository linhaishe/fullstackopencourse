const bloglistsRouter = require('express').Router()
const { request, response } = require('express')
// const mongoose = require('mongoose')
const Bloglist = require('../models/bloglist.js')

// bloglistsRouter.get('/', (request, response) => {
//     Bloglist
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })

bloglistsRouter.get('/',async(request,response)=>{
    const blogs = await Bloglist.find({})
    response.json(blogs)
})
  
bloglistsRouter.post('/', (request, response) => {
    const blog = new Bloglist(request.body)
  
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = bloglistsRouter
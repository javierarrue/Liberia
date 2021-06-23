const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//ALL authors routes
router.get('/', async (req,res) =>{
    //Busqueda de autor por la barrita
    let search = {}
    if(req.query.name != null && req.query.name !== ''){
        search.name = new RegExp(req.query.name, 'i')
    }

    try{
        const authors = await Author.find(search)
        res.render('authors/index', { 
            authors: authors,
            search: req.query.name })
    }catch{
        res.redirect('/')
    }
})

//New author routes
router.get('/new', (req,res) =>{
    res.render('authors/new', {author: new Author()})
})

//Create author routes
router.post('/', async (req,res) =>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
            // res.render(`authors/${newAuthor.id}`)
            res.redirect('authors')        
    }catch{
        res.render('authors/new',{
            author: author,
            errorMessage: 'Error al crear el autor'            
        })
    }

})

module.exports = router
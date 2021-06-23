
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')
const app = express()

//Settings
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//Conectar con BD
DATABASE_URL = 'mongodb://localhost/mybrary'

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('Conectado a mongo'))

app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)

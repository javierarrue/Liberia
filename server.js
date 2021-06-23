
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

//Routers
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

//Settings
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//Conectar con BD
DATABASE_URL = 'mongodb://localhost/mybrary'

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('Conectado a mongo'))

//Routes
app.use('/',indexRouter)
app.use('/authors',authorRouter)

app.listen(process.env.PORT || 3000)

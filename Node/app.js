const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

// Static file

app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img', express.static(__dirname + '/public/img'))
app.use('/js', express.static(__dirname + '/public/js'))


// Template Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




// Routes
const newRoutes = require('./src/routes/news')
app.use('/', newRoutes)



app.listen(port, () => console.log(`Listen ------- ${port}`))
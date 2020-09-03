let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let usersRouter = require('./routes/users')
let indexRouter = require('./routes/index')

let app = express()

var port = 3001

mongoose.connect('mongodb://localhost:27017/backend')

mongoose.connection.on('connected', () => {
    console.log('I am connected to database')
})

app.use(cors())

app.use(express.json())
app.use('/', indexRouter)
app.use('/users', usersRouter)

// app.get('/', (req, res) => {
//     console.log('someone made a get call to /')
//     res.send('welcome to backend app')
// })

app.listen(port, () => {
    console.log(`I am running on port :: ${port}`)
})
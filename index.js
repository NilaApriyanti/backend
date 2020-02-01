const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 5100
const cors = require('cors')
const path = require('path')
const monggose = require('mongoose')

app.use(cors())

app.use(bodyParser.json({
        exteded: true,
        limit:'50mb'
}))
app.use(bodyParser.urlencoded({
        extended: true,
        limit:'50mb'
}))

monggose.connect('mongodb://127.0.0.1:27017/sanggar', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(() => console.log('connected to db'))
.catch(() => console.log('failed to connect'))

app.use('/user', require('./routes/usersanggar'))

app.listen(port,function(){
    console.log('Listening on port ' + port)
})

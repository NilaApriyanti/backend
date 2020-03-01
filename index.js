const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 5100
const cors = require('cors')
const path = require('path')
const monggose = require('mongoose')

app.use(cors())

const dir = path.join(__dirname, 'static')

app.use(express.static(dir))

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
app.use('/gambar', require('./routes/gambar'))
app.use('/wardrobe', require('./routes/wardrobe'))
app.use('/dancer', require('./routes/dancer'))

app.listen(port,function(){
  console.log('Listening on port ' + port)
})

const router = require('express').Router()
const controller = require('../controller/GambarController')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
  {
      name: 'gambar',
      maxCount: 1
  }
])
router.post('/upload', fields, (req,res) => {
  const gambar = req.files['gambar']
  Object.assign(req.body, {
    gambar: gambar[0].filename
  })
  controller.insert(req.body)
    .then(result =>{
        res.json(result)
    }).catch(err=>{
        res.json(err)
    })
})

router.get('/all', (req,res) => {
  controller.getAll()
    .then(result => {
      res.json(result)
    }).catch(err => {
      res.json(err)
    })
})

router.get('/getdetail/:id', (req,res) => {
  controller.getDetail(req.params.id)
    .then(result => {
      console.log(result)
      res.json(result)
    }).catch(err => {
      res.json(err)
    })
})

router.get('/getdatabyuser/:username', (req,res) => {
  controller.getDataByUser(req.params.username)
    .then(result => {
      res.json(result)
    }).catch(err => {
      res.json(err)
    })
})



module.exports = router
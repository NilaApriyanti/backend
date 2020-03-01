const router = require('express').Router()
const controller = require('../controller/dancercontroller')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
  {
      name: 'gambar',
      maxCount: 1
  }
])
router.post('/upload', fields, (req,res) => {
  const dancer = req.files['gambar']
  Object.assign(req.body, {
    gambar: dancer[0].filename
  })
  controller.insert(req.body)
    .then(result =>{
        res.json(result)
    }).catch(err=>{
        res.json(err)
    })
})

router.get('/all', fields, (req,res) => {
  controller.getAll()
    .then(result => {
      res.json(result)
    }).catch(err => {
      res.json(err)
    })
})

router.get('/getbyuser/:username', fields, (req,res) => {
  controller.getByUser(req.params.username)
    .then(result => {
      res.json(result)
    }).catch(err => {
      res.json(err)
    })
})

router.get('/getdetail/:id', (req,res) => {
  controller.getDetail(req.params.id)
    .then(result => {
      res.json(result)
    }).catch(err => {
      res.json(err)
    })
})


module.exports = router
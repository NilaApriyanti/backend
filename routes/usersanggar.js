const router = require('express').Router()
const controller = require('../controller/usersanggarcontroler')

router.post('/register', (req,res)=>{
    controller.register(req.body)
        .then(result =>{
            res.json(result)
        }).catch(err=>{
            res.json(err)
        })
})

router.post('/login', (req,res)=>{
    controller.login(req.body)
        .then(result =>{
            res.json(result)
        }).catch(err=>{
            res.json(err)
        })
})

router.get('/getprofile/:id', (req,res)=>{
    controller.getProfile(req.params.id)
        .then(result =>{
            res.json(result)
        }).catch(err=>{
            res.json(err)
        })
})

router.get('/getall', (req,res)=>{
    controller.getAll()
        .then(result =>{
            res.json(result)
        }).catch(err=>{
            res.json(err)
        })
})
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
    {
        name: 'gambar',
        maxCount: 1
    }
])
router.post('/uploadprofile/:id', fields, (req,res) => {
    const gambar = req.files['gambar']
    controller.uploadImageProfile(gambar[0].filename, req.params.id)
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.get('/search/:keyword', (req,res)=>{
    controller.search(req.params.keyword)
        .then(result =>{
            res.json(result)
        }).catch(err=>{
            res.json(err)
        })
})

router.post('/updateprofile/:id', (req,res)=>{
    controller.updateProfile(req.body, req.params.id)
        .then(result => {
            res.json(result)
        }).catch(err=>{
            res.json(err)
        })
})

module.exports = router
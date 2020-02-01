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

module.exports = router
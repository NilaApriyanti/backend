const modelusersanggar = require('../model/usersanggar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
process.env.SECRET_KEY = Math.ceil(Math.random() * 100000)

exports.register = (data) =>
    new Promise((resolve,reject) => {
        modelusersanggar.find(
            {
                username: data.username
            }
        ).then(user => {
            if (user.length > 0) {
                reject({
                    sukses: false,
                    msg: 'Username Telah Terdaftar'
                })
            } else {
                bcrypt.hash(data.password, 10 , (err, hash) => {
                    data.password = hash
                    modelusersanggar.create(data)
                        .then(() => {
                            resolve({
                                sukses: true,
                                msg: 'Berhasil Registrasi'
                            })
                        }).catch(() => {
                            resolve({
                                msg: 'Terjadi Kesalahan'
                            })
                        })
                })
            }
        })
    })

exports.login = (data) =>
    new Promise((resolve,reject) => {
        modelusersanggar.findOne(
            {
                username: data.username
            }
        ).then(user => {
            if (user){
                if (bcrypt.compareSync(data.password, user.password)) {
                    let token = jwt.sign(data, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    resolve({
                        sukses: true,
                        msg: 'Berhasil Login',
                        token: token
                    })
                } else {
                    resolve({
                        sukses: false,
                        msg: 'Password Anda Salah'
                    })
                }
            } else {
                resolve({
                    sukses: false,
                    msg: 'Username Anda Tidak Terdaftar'
                })
            }
        })
    })
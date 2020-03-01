const modelusersanggar = require('../model/usersanggar')
const bcrypt = require('bcryptjs')
process.env.SECRET_KEY = Math.ceil(Math.random() * 100000)
const ObjectId = require('mongoose').Types.ObjectId

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
                    resolve({
                        sukses: true,
                        msg: 'Berhasil Login',
                        user: user
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

exports.getProfile = (id) =>
    new Promise((resolve, reject) => {
        modelusersanggar.findOne({
            _id: ObjectId(id)
        }).then(res => {
            resolve({
                sukses: true,
                msg: 'Berhasil Memuat Profil',
                data: res
            })
        }).catch(() => {
            resolve({
                sukses: false,
                msg: 'Terjadi Kesalahan',
                data: null
            })
        })
    })

exports.getAll = () =>
    new Promise((resolve, reject) => {
        modelusersanggar.find()
            .then(res => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil Memuat Profil',
                    data: res
                })
        }).catch(() => {
            resolve({
                sukses: false,
                msg: 'Terjadi Kesalahan',
                data: null
            })
        })
    })

exports.search = (keyword) =>
    new Promise((resolve, reject) => {
        modelusersanggar.find({
            username: { $regex: keyword.toLowerCase(), '$options' : 'i' }
        })
            .then(res => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil Memuat Profil',
                    data: res
                })
        }).catch(() => {
            resolve({
                sukses: false,
                msg: 'Terjadi Kesalahan',
                data: null
            })
        })
    })

exports.uploadImageProfile = (gambar, id) =>
    new Promise((resolve, reject) => {
        modelusersanggar.updateOne({
            _id: ObjectId(id)
        },
        {
            gambar: gambar
        }).then(() => {
            modelusersanggar.findOne({
                _id: ObjectId(id)
            }).then((user) => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil Mengubah Gambar Profil',
                    data: user
                })
            }).catch(() => {
                reject({
                    sukses: false,
                    msg: 'Gagal Mengubah xxx Gambar Profil'
                })
            })
        }).catch(() => {
            reject({
                sukses: false,
                msg: 'Gagal Mengubah Gambar Profil'
            })
        })
    })

exports.updateProfile = (data, id) =>
    new Promise((resolve, reject) => {
        modelusersanggar.updateOne({
            _id: ObjectId(id)
        }, data)
            .then(() => {
                modelusersanggar.findOne({
                    _id: ObjectId(id)
                }).then((user) => {
                    resolve({
                        sukses: true,
                        msg: 'Berhasil Merubah Profil',
                        data: user
                    })
                }).catch((err) => {
                    console.log(err)
                    reject({
                        sukses: false,
                        msg: 'Gagal Merubah Profil',
                        data: null
                    })
                })
            }).catch((e) => {
                console.log(e)
                reject({
                    sukses: false,
                    msg: 'Gagal Merubah Profil',
                    data: null
                })
            })
    })
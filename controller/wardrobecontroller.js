const wardrobeModel = require('../model/wardrobe')
const ObjectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
  new Promise((resolve, reject) => {
    wardrobeModel.create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: 'Berhasil Upload'
        })
      }).catch(() => {
        reject({
          sukses: false,
          msg: 'Gagal Upload'
        })
      })
  })

exports.getAll = () =>
  new Promise((resolve, reject) => {
    wardrobeModel.aggregate([
      {
        $lookup: {
          from: "registsanggars",
          localField: "username",
          foreignField: "username",
          as: "user"
        }
      },
      {
        $unwind: '$user'
      }
    ])
      .then(res => {
        resolve({
          sukses: true,
          msg: 'Berhasil Memuat Data',
          data: res
        })
      }).catch(() => {
        resolve({
          sukses: false,
          msg: 'Error Saat Memuat Data'
        })
      })
  })
  exports.getDetail = (id) =>
  new Promise((resolve, reject) => {
    wardrobeModel.findOne({
      _id: ObjectId(id)
    }).then(res => {
      resolve({
        sukses: true,
        msg: 'Berhasil Mendapatkan Data',
        data: res
      })
    }).catch(() => {
      reject({
        sukses: false,
        msg: 'Error Saat Mengambil Data'
      })
    })
  })

exports.getByUsername = (username) =>
  new Promise((resolve, reject) => {
    console.log(username)
    wardrobeModel.find({
      username: username
    }).then(res => {
      resolve({
        sukses: true,
        msg: 'Berhasil Mendapatkan Data',
        data: res
      })
    }).catch(() => {
      reject({
        sukses: false,
        msg: 'Error Saat Mengambil Data'
      })
    })
  })
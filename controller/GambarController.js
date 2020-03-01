const gambarModel = require('../model/gambar')
const ObjectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
  new Promise((resolve, reject) => {
    gambarModel.create(data)
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
    gambarModel.aggregate([
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
    ]).then(res => {
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
    gambarModel.findOne({
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

exports.getDataByUser = (username) =>
  new Promise((resolve, reject) => {
    gambarModel.find({
      username: username
    }).then(res => {
      resolve({
        sukses: true,
        msg: 'Berhasil',
        data: res
      })
    }).catch(() => {
      reject({
        sukses: false,
        msg: 'Gagal Mendapatkan Data'
      })
    })
  })

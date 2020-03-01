const dancerModel = require('../model/dancer')
const ObjectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
  new Promise((resolve, reject) => {
    dancerModel.create(data)
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
    dancerModel.aggregate([
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

exports.getByUser = (username) =>
  new Promise((resolve, reject) => {
    dancerModel.find({
      username: username
    })
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
    dancerModel.findOne({
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
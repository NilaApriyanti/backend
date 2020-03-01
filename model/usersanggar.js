const mongoose = require("mongoose");
const Schema = mongoose.Schema
const sanggarSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    alamat: {
        keterangan: String,
        lat: Number,
        long: Number,
    },
    notelp: {
        type: Number
    },
    gambar: {
        type: String,
        default: null
    }
})


module.exports  = mongoose.model('registsanggar', sanggarSchema);
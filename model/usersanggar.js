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
        type: String
    },
    notelp: {
        type: Number
    },
})


module.exports  = mongoose.model('registsanggar', sanggarSchema);
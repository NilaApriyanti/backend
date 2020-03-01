const mongoose = require("mongoose");
const Schema = mongoose.Schema
const sanggarSchema = new Schema({
    gambar: {
        type: String
    },
    caption: {
        type: String
    },
    username: {
      type: String
    },
    createdAt: {
      type: Date,
      default: new Date().toLocaleDateString()
    }
})


module.exports  = mongoose.model('dancer', sanggarSchema);
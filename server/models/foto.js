const mongoose = require('mongoose')
const Schema = mongoose.Schema

var fotoSchema = new Schema({

  caption: {
    type: String,
    required: [true, 'title is required']
  },

  urlimg: {
    type: String,
    required: [true, 'title is required']
  },

  by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  like: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
})

var foto = mongoose.model('fotos', fotoSchema)
module.exports = foto;

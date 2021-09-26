const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

schema.set('toJSON', {
  transform: (_, obj) => {
    delete obj.__v
    obj.id = obj._id.toString()
    delete obj._id
    return obj
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)

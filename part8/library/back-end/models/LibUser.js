const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.model('LibUser', schema)

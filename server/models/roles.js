const mongoose = require('mongoose');
const {Schema} = mongoose

const rolesSchema = new Schema({
  name: {
    type: String
  },
  minAge: {
    type: Number
  },
  maxAge: {
    type: Number
  },
  gender: {
    type: String
  },
  type: {
    type: String
  },
  description: {
    type: String
  },
  specifics: [String],
  isOpen: {
    type: Boolean
  },
  actor: {
    type: String
  }
})

const Roles = mongoose.model('Roles', rolesSchema)

module.exports = { Roles }

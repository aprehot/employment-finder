const mongoose = require('mongoose');
const {Schema} = mongoose

const rolesSchema = new Schema({
  roleType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  minAge: {
    type: Number,
    required: true
  },
  maxAge: {
    type: Number,
    required: true
  },
  specifics: [String],
  description: {
    type: String,
    required: true
  },
  isSAG: {
    type: Boolean
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  isLocal: {
    type: Boolean
  },
  isOnOffer: {
    type: Boolean
  }
})

const Roles = mongoose.model('Roles', rolesSchema)

module.exports = { Roles }

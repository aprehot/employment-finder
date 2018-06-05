const mongoose = require('mongoose');
const {Schema} = mongoose

const teamsSchema = new Schema({
  executive: {
    type: [String]
  },
  producer: {
    type: [String],
    required: true
  },
  director: {
    type: [String]
  },
  writer: {
    type: [String]
  },
  castingDirector: {
    type: [String]
  },
  talent: {
    type: [String]
  }
})

const Teams = mongoose.model('Teams', teamsSchema)

module.exports = { Teams }

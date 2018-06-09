const mongoose = require('mongoose');

const { Schema } = mongoose;

const rolesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  ownerId: {
    type: String,
    required: true
  },
  
});

const Roles = mongoose.model('Roles', rolesSchema);

module.exports = { Roles };

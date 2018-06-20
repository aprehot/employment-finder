export { };
const mongoose = require('mongoose');

const { Schema } = mongoose;
const folderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: {
    type: String,
    required: true,
    enum: ['Company', 'Personal']
  },
  ownerId: {
    type: String,
    required: true
  },
  folderName: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Folders', folderSchema);


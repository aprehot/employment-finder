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
  },
  // projects: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});


module.exports = mongoose.model('Folders', folderSchema);


// const populateFolders = async function () {
//   await this.populate('Project');
// };
//
// folderSchema.pre('find', populateFolders);
// folderSchema.pre('findOneAndUpdate', populateFolders);

// module.exports = { Folders };

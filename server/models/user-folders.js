const mongoose = require('mongoose');

const { Schema } = mongoose;

const folderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ownerId: {
    type: String,
    required: true
  },
  folderName: {
    type: String,
    required: true
  }
  // projects: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Project'
  // }]
});

// const populateFolders = async function () {
//   await this.populate('Project');
// };
//
// folderSchema.pre('find', populateFolders);
// folderSchema.pre('findOneAndUpdate', populateFolders);


module.exports = mongoose.model('Folders', folderSchema);


// module.exports = { Folders };

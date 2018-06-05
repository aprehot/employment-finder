const mongoose = require('mongoose');
const {Schema} = mongoose


const folderSchema = new Schema({
  folderName: {
    type: String,
    required:true
  },
  category: {
    type: String,
    required: true
  },
	projects: [{type:Schema.ObjectId, ref: 'Project'}],
  ownerId:{
    type: String,
    required: true
  }
})

const populateFolders = async function() {
	await this.populate('Project')
}

folderSchema.pre('find', populateFolders)
folderSchema.pre('findOneAndUpdate', populateFolders)

const Folders = mongoose.model('Folders', folderSchema)

module.exports = { Folders }

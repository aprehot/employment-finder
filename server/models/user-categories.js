const mongoose = require('mongoose');
const {Schema} = mongoose


const categorySchema = new Schema({
  folders: [{type:Schema.ObjectId, ref: 'Folder'}],
  category: {
    type: String,
    required: true
  },
  ownerId:{
    type: String,
    required: true
  }
})

const populateCategories = async function() {
	await this.populate('Folder')
}

categorySchema.pre('find', populateCategories)
categorySchema.pre('findOneAndUpdate', populateCategories)

const Categories = mongoose.model('Categories', categorySchema)

module.exports = { Categories }

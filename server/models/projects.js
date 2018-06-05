const mongoose = require('mongoose');
const {Schema} = mongoose


const projectsSchema = new Schema({
  folder: {
    type: String
    required:true
  },
	projects: [{type:Schema.ObjectId, ref: 'Project'}],
  ownerId:{
    type: String,
    required: true
  }
}, {timestamps:true})

const populateProjects = async function() {
	await this.populate('Project')
}

projectsSchema.pre('find', populateProjects)
projectsSchema.pre('findOneAndUpdate', populateProjects)

const Projects = mongoose.model('Projects', projectsSchema)

module.exports = { Projects }

const mongoose = require('mongoose');
const {Schema} = mongoose


const projectsSchema = new Schema({
  folder: {
    type: String
    required:true
  },
	projects: [ projectSchema ],
  ownerId:{
    type: String,
    required: true
  }
}, {timestamps:true})

const Projects = mongoose.model('Projects', projectsSchema)

module.exports = { Projects }

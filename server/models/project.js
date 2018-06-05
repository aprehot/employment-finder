const mongoose = require('mongoose');
const {Schema} = mongoose

const projectSchema = new Schema({
   folder: {
     type: String,
     required:true
   },
   title: {
     type: String,
     required:true
   },
   type: {
     type: String,
     required:true
   },
   studio: {
     type: String,
     required:true
   },
   startDate: {
     type: String,
   },
   wrapDate: {
     type: String
   },
   budget: {
     type: String
   },
   location: {
     type: String
   },
   premise: {
     type: String
   },
   hasCD: {
     type: Boolean
   },
   roles: [{type:Schema.ObjectId, ref: 'Roles'}],
   producer: {
     type: String
   },
   director: {
     type: String
   },
   writer: {
     type: String
   },
   castingDirector: {
     type: String
   },
   access: {
     type: [String]
   },

})

const populateRoles = async function() {
	await this.populate('Roles')
}

projectSchema.pre('find',populateRoles)
projectSchema.pre('findOneAndUpdate',populateRoles)

const Project = mongoose.model('Project', projectSchema)

module.exports = { Project }

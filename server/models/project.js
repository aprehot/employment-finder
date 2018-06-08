// const mongoose = require('mongoose');
//
// const { Schema } = mongoose;
//
// const projectSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   ownerId: {
//     type: String,
//     required: true
//   },
//   projectType: {
//     type: String,
//     required: true,
//     enum: ['Film', 'TV', 'Mini-Series', 'Web']
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   studio: {
//     type: String,
//     required: true
//   },
//   startDate: {
//     type: String,
//   },
//   wrapDate: {
//     type: String
//   },
//   location: {
//     type: String
//   },
//   budget: {
//     type: String
//   },
//   genres: {
//     type: [String]
//   },
//   premise: {
//     type: String
//   },
//   hasCD: {
//     type: Boolean
//   },
//   roles: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Roles'
//   }],
//   teams: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Teams'
//   }],
//   activeCasting: {
//     type: Boolean
//   },
//   activeDirector: {
//     type: Boolean
//   },
//   activeProducer: {
//     type: Boolean
//   },
//   activeFinancing: {
//     type: Boolean
//   },
//   inDev: {
//     type: Boolean
//   },
//   hasAvailRoles: {
//     type: Boolean
//   },
//   inProduction: {
//     type: Boolean
//   },
//   security: {
//     type: String,
//     required: true,
//     enum: ['Open', 'first', 'second']
//   }
// });
// //
// // const populateRoles = async function() {
// // 	await this.populate('Roles')
// // }
// // const populateTeams = async function() {
// // 	await this.populate('Teams')
// // }
// //
// // projectSchema.pre('find',populateRoles)
// // projectSchema.pre('findOneAndUpdate',populateRoles)
// // projectSchema.pre('find',populateTeams)
// // projectSchema.pre('findOneAndUpdate',populateTeams)
//
// const Project = mongoose.model('Project', projectSchema);
//
// module.exports = { Project };

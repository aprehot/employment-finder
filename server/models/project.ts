export { };
const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ownerId: {
    type: String,
    required: true
  },
  parentFolder: {
    type: String,
    required: true
  },
  parentCategory: {
    type: String,
    required: true,
    enum: ['Company', 'Personal']
  },
  projectType: {
    type: String,
    required: true,
    enum: ['Film', 'TV', 'Mini-Series', 'Web']
  },
  title: {
    type: String,
    required: true
  },
  studio: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
  },
  wrapDate: {
    type: String
  },
  location: {
    type: String
  },
  budget: {
    type: String
  },
  genres: {
    type: [String]
  },
  premise: {
    type: String
  },
  hasCD: {
    type: Boolean
  },
  roles: [{
    roleType: { type: String, required: true, enum: ['Lead', 'Strong', 'Supporting', 'Small', 'Cameo'] },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    ages: [Number],
    specifics: [String],
    description: { type: String, required: true },
    isSAG: { type: Boolean },
    isOpen: { type: Boolean, required: true },
    isLocal: { type: Boolean },
    isOnOffer: { type: Boolean }
  }],
  teams: [{
    job: { type: String, required: true, enum: ['producer', 'executive', 'director', 'writer', 'castingDirector', 'talent'] },
    name: { type: String, required: true },
    email: { type: String, required: true },
    priviledge: { type: String, required: true, eunm: ['admin', 'collab', 'viewer', 'downloader'] }
  }],
  activeCasting: {
    type: Boolean
  },
  activeDirector: {
    type: Boolean
  },
  activeProducer: {
    type: Boolean
  },
  activeFinancing: {
    type: Boolean
  },
  inDev: {
    type: Boolean
  },
  hasAvailRoles: {
    type: Boolean
  },
  inProduction: {
    type: Boolean
  }
});

module.exports = mongoose.model('Project', projectSchema);

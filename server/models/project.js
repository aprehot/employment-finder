const mongoose = require('mongoose');
const {Schema} = mongoose

const projectSchema = new Schema({
    projectType: {
    type: String,
    required:true,
    enum:['Film', 'TV', 'Mini-Series', 'Web']
  },
   title: {
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
     roleType: {
       type: String,
       required: true,
   		enum:["Lead", "Strong", "Supporting",  "Small", "Cameo"]
     },
     name: {
       type: String,
       required: true
     },
     gender: {
       type: String,
       required: true,
       enum:["Male", "Female", "Either"]
     },
     minAge: {
       type: Number,
       required: true
     },
     maxAge: {
       type: Number,
       required: true
     },
     specifics: [String],
     description: {
       type: String,
       required: true
     },
     isSAG: {
       type: Boolean
     },
     isOpen: {
       type: Boolean,
       required: true
     },
     isLocal: {
       type: Boolean
     },
     isOnOffer: {
       type: Boolean
     }
   }],
   teams: [{
     executive: {
       type: [String]
     },
     producer: {
       type: [String],
       required: true
     },
     director: {
       type: [String]
     },
     writer: {
       type: [String]
     },
     castingDirector: {
       type: [String]
     },
     talent: {
       type: [String]
     }
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
   },
   security: {
     type: String,
     required: true,
     enum:['Open', 'first', 'second']
   },
   ownerId:{
    type: String,
    required: true
  }

})
//
// const populateRoles = async function() {
// 	await this.populate('Roles')
// }
// const populateTeams = async function() {
// 	await this.populate('Teams')
// }
//
// projectSchema.pre('find',populateRoles)
// projectSchema.pre('findOneAndUpdate',populateRoles)
// projectSchema.pre('find',populateTeams)
// projectSchema.pre('findOneAndUpdate',populateTeams)

const Project = mongoose.model('Project', projectSchema)

module.exports = { Project }

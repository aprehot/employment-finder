const mongoose = require('mongoose');
const {Schema} = mongoose


const categorySchema = new Schema({
    ownerId:{
      type: String,
      required: true
    },
    category: [{
      categoryName: {
        type: String,
        required:true,
        enum:["Company","Personal"]
      },
      folders: [{
        folderName: {
          type: String,
          required: true
        },
        projects: [{
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
            roleType: {type: String,required: true,enum:["Lead", "Strong", "Supporting",  "Small", "Cameo"]},
            name: {type: String,required: true},
            gender: {type: String,required: true,enum:["Male", "Female", "Either"]},
            minAge: {type: Number,required: true},
            maxAge: {type: Number,required: true},
            specifics: [String],
            description: {type: String,required: true},
            isSAG: {type: Boolean},
            isOpen: {type: Boolean,required: true},
            isLocal: {type: Boolean},
            isOnOffer: {type: Boolean}
          }],
          teams: [{
            executive: {type: [String]},
            producer: {type: [String],required: true},
            director: {type: [String]},
            writer: {type: [String]},
            castingDirector: {type: [String]},
            talent: {type: [String]}
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
          }
        }]
      }]
    }]
  })

  // const populateCategories = async function() {
  //   await this.populate('Folder')
  // }
  //
  // categorySchema.pre('find', populateCategories)
  // categorySchema.pre('findOneAndUpdate', populateCategories)

  const Categories = mongoose.model('Categories', categorySchema)

  module.exports = { Categories }

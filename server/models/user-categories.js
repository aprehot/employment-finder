// const mongoose = require('mongoose');
//
// const { Schema } = mongoose;
//
//
// const categorySchema = new Schema({
//   _id:  Schema.Types.ObjectId,
//   ownerId: {
//     type: String,
//     required: true
//   },
  // category: [{
  //   categoryName: {
  //     executive: { type: [String] },
  //     producer: { type: [String], required: true },
  //     director: { type: [String] },
  //     writer: { type: [String] },
  //     castingDirector: { type: [String] },
  //     talent: { type: [String] }
  //   }
  // }]
  //   },
  //   folders: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Folder'
  //   }]
  // }]
// });
//
// // const populateCategories = async function() {
// //   await this.populate('Folder')
// // }
// //
// // categorySchema.pre('find', populateCategories)
// // categorySchema.pre('findOneAndUpdate', populateCategories)
//
// const Categories = mongoose.model('Categories', categorySchema);
//
// module.exports = { Categories };

// const mongoose = require('mongoose');
//
// const { Schema } = mongoose;
//
// const rolesSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   ownerId: {
//     type: String,
//     required: true
//   },
//   roleType: { type: String, required: true, enum: ['Lead', 'Strong', 'Supporting', 'Small', 'Cameo'] },
//   name: { type: String, required: true },
//   gender: { type: String, required: true, enum: ['Male', 'Female', 'Either'] },
//   minAge: { type: Number, required: true },
//   maxAge: { type: Number, required: true },
//   specifics: [String],
//   description: { type: String, required: true },
//   isSAG: { type: Boolean },
//   isOpen: { type: Boolean, required: true },
//   isLocal: { type: Boolean },
//   isOnOffer: { type: Boolean }
// });
//
// const Roles = mongoose.model('Roles', rolesSchema);
//
// module.exports = { Roles };

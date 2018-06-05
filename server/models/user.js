const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstname:{
    type:String,
    maxlength:100
  },
  lastname: {
    type:String,
    maxlength:100
  },
  accountType: {
    type:String,
		enum:["Representative", "Casting Director", "Producer", "Executive", "Actor", "Writer", "Director"]
	},
  busPhone: {
    type: Number,
    required: true,
    maxLength:11,
    minLength:10
  },
  cellPhone: {
    type: Number,
    maxLength:11,
    minLength:10
  },
  icon: {
    type: String
  },
  token:{
    type:String
  }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }

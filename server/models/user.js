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


// REGISTERS USER //

userSchema.pre('save',function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(SALT_I,function(err,salt){
      if(err) return next(err);

      bcrypt.hash(user.password,salt,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    next()
  }
})

// COMPARES PASSWORD //

userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

// GENERATES JWT TOKEN //

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),config.SECRET);

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }

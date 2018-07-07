export { }; // Since we dont import using ES2016 modules, we export an empty object at the top
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);

const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
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
  firstname: {
    type: String,
    maxlength: 100
  },
  lastname: {
    type: String,
    maxlength: 100
  },
  accountType: {
    type: String,
    enum: ['Representative', 'Casting Director', 'Producer', 'Executive', 'Actor', 'Writer', 'Director']
  },
  busPhone: {
    type: Number,
    required: true,
    maxLength: 11,
    minLength: 5
  },
  cellPhone: {
    type: Number,
    maxLength: 11,
    minLength: 10
  },
  icon: {
    type: String
  },
  token: {
    type: String
  }
});


// REGISTERS USER //

//The 'this' error is indeed fixed by inserting this with a type annotation as the first callback parameter. 
// https://stackoverflow.com/questions/41944650/this-implicitly-has-type-any-because-it-does-not-have-a-type-annotation

userSchema.pre('save', function (this: any, next: any) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I, (err: any, salt: any) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err: any, hash: any) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// COMPARES PASSWORD //

userSchema.methods.comparePassword = function (candidatePassword: any, cb: any) {
  console.log("value of this: ", this);
  bcrypt.compare(candidatePassword, this.password, (err: string, isMatch: boolean) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// GENERATES JWT TOKEN //

userSchema.methods.generateToken = function (cb: (action1: any, action2?: any) => void) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), config.SECRET);

  user.token = token;
  user.save((err: any, user: any) => {
    if (err) return cb(err);
    cb(null, user);
  });
};


// FINDS TOKEN FOR LOGGING OUT //

userSchema.statics.findByToken = function (token: string, cb: (action1: any, action2?: any) => void) {
  const user: any = this;

  jwt.verify(token, config.SECRET, (err: string, decode: any) => {
    user.findOne({ _id: decode, token }, (err: string, user: any) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.methods.deleteToken = function (token: string, cb: any) {
  const user = this;

  user.update({ $unset: { token: 1 } }, (err: any, user: any) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };

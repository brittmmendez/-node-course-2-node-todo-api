const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//stores the schema for a user -- all the props that we define to rquire/validate
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {  //works because we installed validator
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {   //override the method generateAuthToken -  this will decide what gets sent back when a mongooose model is converted into a JSON VALUE
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email'])
}

//instance method responsible for adding a token on to the individual user document
UserSchema.methods.generateAuthToken = function () { //use reg function and not Array function because arrays don't bing 'this' keyword
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); //generates the token

  user.tokens.push({access, token}); //update users array to push in the {auth: token} object we created above

  return user.save().then(() => {  // we updated the user model above but need to save.. we a retuning the save to chain on a promise in server.js
    return token;
  });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User}

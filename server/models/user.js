const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

module.exports = {User}

//examples:
// //create a variable (any name you want) must create a new instance of Todo
// let newUser = new User({
//   email: 'brittmmendez@gmail.com'
// })
//
// //creating the instance above doesn't save it to the db... variableName.save()
// newUser.save().then((doc) => {
//   console.log('Saved User:', doc);
// }, (e) => {
//   console.log('Unable to save user');
// })
//
//

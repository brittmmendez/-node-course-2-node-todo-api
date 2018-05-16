//load in mongoose
const mongoose = require('mongoose');

//tell mongoose which promise library to use
mongoose.Promise = global.Promise;
//connect mongoose to our mongodb so we can start writing data to db until mongoose knows how to connect
mongoose.connect('mongodb://localhost:27017/TodoApp');



module.exports = {mongoose};

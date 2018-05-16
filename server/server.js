//library imports
const _ = require('lodash'); //Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
const express = require('express'); //Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
const bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers
const {ObjectID} = require('mongodb'); //Create a new ObjectID instance

//local imports
const {mongoose} = require('./db/mongoose'); //Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


//stores the express application
const app = express();
//sets up local port or heroku port
const port = process.env.PORT || 3000;

//middleware - takes the body data sent from client json and convert it to an object attaching it on to the request object
app.use(bodyParser.json());

//CREATE - make new todo by sending JSON obj with text prop to server -> server will take it create document and send back doc
app.post('/todos', (req, res) => {
  //create an instance of mongoose model
  let newTodo = new Todo({
    text: req.body.text
  });

  //save model to db
  newTodo.save().then((doc) =>{
    res.send(doc)
  }, (e) => {
    res.status(400).send(e);
  });
});




//READ
  app.get('/todos', (req, res) => {
    //create an instance of mongoose model
    Todo.find().then((todos) =>{
      res.send({todos});
    }, (e) => {
      res.status(400).send(e);
    });
  });

//READ by ID
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  //validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  //create an instance of mongoose model
  Todo.findById(id).then((todo) => {

    //handles the error if ID isn't found
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});




//DELETE by ID
app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  //validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  //create an instance of mongoose model
  Todo.findByIdAndRemove(id).then((todo) => {

    //handles the error if ID isn't found
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});



//UPDATE by id
  app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;

    //needed lodash for this specifically so users can't change things I don't want them to.
    //This checks the body of the request and picks the two items in my array and will only update this
    let body = _.pick(req.body, ['text', 'completed']);

    //validate id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    };

    //updated the completed at based on body prop
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    }else{
      body.completed = false;
      body.completedAt = null;
    }

    //make our call to find by id and update
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      //handles the error if ID isn't found
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  });


app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app};

//library imports
const express = require('express');
const bodyParser = require('body-parser');

//local imports
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


//stores the expres application
const app = express();

//takes the body data sent from client json and convert it to an object attaching it on to the request object
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

app.listen(3000, () => {
  console.log('Started on port 3000');
})

module.exports = {app};

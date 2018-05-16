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

app.post('/todos', (req, res) => {
  let newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((doc) =>{
    res.send(doc)
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
})

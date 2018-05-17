// //library imports
// const _ = require('lodash');
// const express = require('express');
// const bodyParser = require('body-parser');
// const {ObjectID} = require('mongodb');
// const router = express.Router();
//
// const {User} = require('../models/user');
// const {Player} = require('../models/player');
//
// const {authenticate} = require('../middleware/authenticate');
//
//
// // CREATE USER
// router.post('/api/user', (req, res) => {
//   let body = _.pick(req.body, ['first_name', 'last_name', 'email', 'password', 'passwordConf']);
//
//   if (body.password !== body.passwordConf) {                //confirm password
//     return res.status(400).send('Error: Password and confirmation password must match');
//   }
//
//   let user = new User(body);
//   user.save().then(() => {
//     return user.generateAuthToken();                       //call the method to geenrate token
//   }).then((token) => {
//     res.header('x-auth', token).send(user);               //send the token back as an http header. x-auth is a custom header for our specific purpose.
//   }).catch((e) => {
//     res.status(400).send(e);
//   })
// });
//
// // GET /users/:id
// router.get('/api/users/:id', authenticate, (req, res) => {   //runs middleware authencate and sends response below if no errors
//   res.send(req.user);                                     //sending the user the request with the info we found/set in findByToken
// });
//
// // USER LOGIN
// router.post('/api/login', (req, res) => {
//   let body = _.pick(req.body, ['email', 'password']);
//
//   User.findByCredentials(body.email, body.password).then((user) => {    //call to veryfy if  user exsists with that email. check password
//     user.generateAuthToken().then((token) => {
//       res.header('x-auth', token).send(user);               //send the token back as an http header. x-auth is a custom header for our specific purpose.
//     });
//   }).catch((e) =>{
//     res.status(400).send();
//   });
// });
//
// //SIGN OUT
// router.delete('/api/logout', authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send();
//   }, () => {
//     res.status(400).send();
//   });
// });
//
//
// module.exports = router

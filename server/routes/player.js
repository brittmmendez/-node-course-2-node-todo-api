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
// //CREATE PLAYER
// router.post('/api/players', authenticate, (req, res) => {
//
//   if (req.body.handedness !== "left" && req.body.handedness !== "right") {
//     return res.status(400).send('Error: handedness must be right or left');
//   }
//
//   Player.findOne({
//     first_name: req.body.first_name,
//     last_name:req.body.last_name
//   }).then((player) => {
//     if (player) {
//       return res.status(400).send('Error: Player already exists');
//     }
//   })
//
//   let newPlayer = new Player({                   //create an instance of mongoose Player model
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     rating: req.body.rating,
//     handedness: req.body.handedness,
//     _creator: req.user._id
//   });
//
//   newPlayer.save().then((doc) =>{                 //save player to db
//     res.send(doc)
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });
//
// //LIST ALL PLAYERS
// router.get('/api/players', authenticate, (req, res) => {
//   Player.find({
//     _creator: req.user._id                        //only returns player  made by this user
//   }).then((players) =>{
//     res.send({players});
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });
//
// //SHOW PLAYER
// router.get('/api/players/:id', authenticate, (req, res) => {
//   let id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {                     //validate id
//     return res.status(404).send();
//   };
//
//   Player.findOne({
//     _id: id,
//     _creator: req.user._id                         //only returns player  made by this user
//   }).then((player) => {
//     if (!player) {                                //handles the error if ID isn't found
//       return res.status(404).send();
//     }
//
//     res.send({player});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
// //DELETE PLAYER
// router.delete('api/players/:id', authenticate, (req, res) => {
//   let id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {                      //validate id
//     return res.status(404).send();
//   }
//
//   Player.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id                          //only returns player  made by this user
//   }).then((player) => {                             //create an instance of mongoose model
//     if (!player) {                                 //handles the error if ID isn't found
//       return res.status(404).send();
//     }
//
//     res.send({player});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
//
//
// //UPDATE PLAYER
// router.patch('/api/players/:id', authenticate, (req, res) => {
//   let id = req.params.id;
//   // let body = _.pick(req.body, ['text', 'completed']);     //needed lodash for this specifically so users can't change things I don't want them to. This checks the body of the request and picks the two items in my array and will only update this
//   let body = _.pick(req.body, ['first_name', 'last_name', 'rating', 'handedness']);
//   if (!ObjectID.isValid(id)) {                            //validate id
//     return res.status(404).send();
//   };
//
//   Player.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((player) => {  //make our call to find by id and update
//     if (!player) {
//       return res.status(404).send();                      //handles the error if ID isn't found
//     }
//
//     res.send({player});
//   }).catch((e) => {
//     res.status(400).send();
//   })
// });
//
//
// module.exports = router

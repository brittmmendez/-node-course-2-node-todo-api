const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Player} = require('./../../models/player');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  first_name: 'Brittany',
  last_name: 'Morris' ,
  email: 'brittany@example.com',
  password: 'userOnePass',
  passwordConf: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  first_name: 'Ryan',
  last_name: 'Morris' ,
  email: 'Ryan@example.com',
  password: 'userTwoPass',
  passwordConf: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
  }]
}];

const players = [{
  _id: new ObjectID(),
  first_name: 'First test player',
  last_name: 'First test player',
  rating: 3,
  handedness: 'right',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  first_name: 'Second test player',
  last_name: 'Second test player',
  rating: 3,
  handedness: "left",
  _creator: userTwoId
}];

const populatePlayers = (done) => {
  Player.remove({}).then(() => {
    return Player.insertMany(players);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {players, populatePlayers, users, populateUsers};

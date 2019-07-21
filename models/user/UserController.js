// UserController.js

const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/auth/proposals', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const User       = require('./User');
const middleware = require('../../middleware');

router.get('/', function (req, res) {
  let query = req.query
  User.find({query}, function (err, users) {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
});

//DELETE SINGLE USER FROM DATABASE
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err)
      return res
        .status(500)
        .send("There is a problem deleting a user");
    res
      .status(200)
      .send("User " + user.username + " was deleted");
  });
});

//UPDATE A SINGLE USER IN DATABASE
router.put('/:id', (req, res) => {

  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    if (err)
      return res
        .status(500)
        .send("There was a problem with updating a user");
    res
      .status(200)
      .send(user)
  });
});

module.exports = router;

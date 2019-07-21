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

//GET WITH QUERY
router.get('/blabla', (req, res) => {

  let filters = req.query

  if(query.age != null) {
    filters = {
      age: {$gt: req.query.age, $lt:40} //age greater than 30 and less than 40
    }
  }

  User.find(filters)
      .then(data => {
        res.json({
          confirmation: 'success',
          data: data
        })
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          data: err.message
        })
      })
});

//UPDATE WITH ID
router.put('/profile/update', (req, res) => {

  const query = req.query    //require: id, key=value
  const profileId = query.id
  delete query['id']

  User.findByIdAndUpdate(profileId, query, {new: true})
      .then(data => {
        res.json({
          confirmation: 'Updated successfully',
          data: data
        })
      })
      .catch(err => {
        res.json({
          confirmation: 'failure',
          data: data
        })
      })
});

//GET WITH ID
router.get('/blabla/:id', (req, res) => {

  const id = req.params.id

  User.findById(id)
      .then(data => {
        res.json({
          confirmation: 'success',
          data: data
        })
      })
      .catch(err => {
        res.json({
          confirmation: 'fail',
          data: 'Profile ' + id + ' not found'
        })
      })
});

//CREATE PROFILE POST REQUEST
router.post('/blaregister', (req, res) => {
  User.create(req.body)
      .then(data => {
        res.json({
          confirmation: 'success',
          data: data
        })
      })
      .catch(err => {
        res.json({
          confirmation: 'failure',
          data: data
        })
      })
});

//DELETE
router.get('/profile/remove', (req, res) => {

  const query = req.query

  User.findByIdAndRemove(query.id)
      .then(data => {
        res.json({
          confirmation: 'success',
          data: 'Profile ' + query.id + ' successfully removed.'
        })
      })
      .catch(err => {
        res.json({
          confirmation: 'failure',
          data: err.message
        })
      })
});

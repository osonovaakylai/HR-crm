const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/candidates', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const Candidate  = require('./Candidate');
const Position   = require('../position/Position');
const middleware = require('../../middleware');

router.post('/create', middleware.checkToken, (req, res, err) => {

  let candidate = new Candidate(req.body);

  candidate.save()
           .then((candidate) => {
             return res.json('Candidate added successfully');
           })
           .catch(err => {
             console.log(err.message)
             return res.status(400)
                       .send(err.message);
           });
});

router.get('/', middleware.checkToken, (req, res, err) => {
  Candidate
    .find()
    .sort({date: 'desc'})
    .populate('department level status attachedCV', 'size filename name-_id')
    .exec(function (err, list) {
      if (err) {
        console.log(err);
      }
      else {
        let filteredList = list.filter(item => item.status.name === req.query.status);
        return res.status(200)
                  .send({list: filteredList});
      }
    })
});

router.get('/:id', middleware.checkToken, (req, res, err) => {

  Candidate.findById(req.params.id, req.body, {new: true})
           .populate('department status level attachedCV')
           .exec(function (err, candidate) {

             if (err) {
               console.log(err);
             }
             else {
               return res.status(200)
                         .send(candidate);
             }

           })
});

router.put('/:id', middleware.checkToken, (req, res) => {

  Candidate.findByIdAndUpdate(req.params.id, req.body, {new: true})
           .populate('department status level attachedCV')
           .exec(function (err, candidate) {

             if (err) {
               console.log(err);
             }
             else {
               return res.status(200)
                         .send(candidate);
             }
           })
});

router.delete('/:id', (req, res) => {
  Candidate.findByIdAndRemove(req.params.id, (err, candidate) => {
    if (err)
      return res
        .status(500)
        .send("There is a problem deleting a candidate");
    res
      .status(200)
      .send("User " + candidate.firstname + " " + candidate.lastname + " was deleted");
  });
});

module.exports = router;

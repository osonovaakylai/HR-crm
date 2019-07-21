// UserController.js

const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/proposals', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const Position   = require('../position/Position');
const middleware = require('../../middleware');

// GET ALL PROPOSALS
router.get('/', middleware.checkToken, (req, res, err) => {

  if(req.query.status === 'all') {
    Position
      .find()
      .sort({date: 'desc'})
      .populate('position', 'name-_id')
      .select('creator position date amount status')
      .exec(function (err, positions) {

        if (err) {
          console.log(err);
        }
        else {
          return res.status(200)
                    .send({list: positions});
        }
      })
  }
  else {
    Position
      .find({status: req.query.status})
      .sort({date: 'desc'})
      .populate('position', 'name-_id')
      .select('creator position date amount status')
      .exec(function (err, positions) {

        if (err) {
          console.log(err);
        }
        else {
          return res.status(200)
                    .send({list: positions});
        }
      })
  }
});

module.exports = router;

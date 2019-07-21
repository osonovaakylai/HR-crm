const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/candidates-list', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const Candidate  = require('../candidate/Candidate');
const middleware = require('../../middleware');

// GET ALL POSITIONS
router.get('/', middleware.checkToken, (req, res, err) => {

  Candidate
    .find({})
    .populate('status', 'name-_id')
    .select('email')
    .exec(function (err, list) {
      if (err) {
        console.log(err);
      }
      else {
        let filteredList = list.filter(item => item.status.name === 'review' || item.status.name === 'reserve');
        return res.status(200)
                  .send({list: filteredList});
      }
    })
});

module.exports = router;

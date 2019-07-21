const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/statistics', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const LanguagePie = require('./LanguagePie');
const ResumeLine  = require('./ResumeLine');
const Total       = require('./Total');
const middleware  = require('../../middleware');

router.get('/languagePie', middleware.checkToken, (req, res, err) => {

  LanguagePie.find({}, function (err, statistics) {
    if (err) return res.status(500)
                       .send("There was a problem finding the LanguagePie.");

    res.status(200)
       .send({values: statistics});
  });

});

router.get('/resumeLine', middleware.checkToken, (req, res, err) => {

  ResumeLine.find({}, function (err, statistics) {
    if (err) return res.status(500)
                       .send("There was a problem finding the ResumeLine.");

    res.status(200)
       .send({values: statistics});
  });

});

router.get('/totals', middleware.checkToken, (req, res, err) => {

  Total.findOne({}, function (err, statistic) {
    if (err) return res.status(500)
                       .send("There was a problem finding the Total.");

    res.status(200)
       .send(statistic);
  });

});

module.exports = router;

const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/level-names', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const LevelName   = require('./LevelName');
const middleware = require('../../middleware');


// GET ALL POSITIONS
router.get('/', middleware.checkToken, (req, res, err) => {

  LevelName.find({}, function (err, levelnames) {
    if (err) return res.status(500)
                       .send("There was a problem finding the level name.");

    res.status(200)
       .send({list: levelnames});
  });

});

module.exports = router;

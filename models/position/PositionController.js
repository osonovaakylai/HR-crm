// UserController.js

const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/positions', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const Position   = require('./Position');
const middleware = require('../../middleware');

router.post('/create-position', middleware.checkToken, (req, res, err) => {
  console.log(req.body)

  let position = new Position(req.body);

  position.save()
          .then((position) => {
            return res.json('Position added successfully');
          })
          .catch(err => {
            console.log(err)
            return res.status(400)
                      .send("unable to save position to database");
          });
});

// GET ALL POSITIONS
router.get('/', middleware.checkToken, (req, res, err) => {

  if(req.query.status === 'all') {
    Position
      .find()
      .sort({date: 'desc'})
      .populate('department level position', 'name-_id')
      .exec(function (err, positions) {

        if (err) {
          console.log(err);
        }
        else {
          return res.status(200)
                    .send({list: positions});
        }
      })
  } else {
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

router.get('/:id', middleware.checkToken, (req, res, err) => {

  Position.findById(req.params.id, req.body, {new: true})
          .populate('department position level')
          .exec(function (err, position) {

            if (err) {
              console.log(err);
            }
            else {
              return res.status(200)
                        .send(position);
            }

          })
});

router.put('/:id', (req, res) => {

  Position.findByIdAndUpdate(req.params.id, req.body, {new: true})
          .populate('department position level')
          .exec(function (err, position) {

            if (err) {
              console.log(err);
            }
            else {
              return res.status(200)
                        .send(position);
            }

          })
});

router.post('/close/:id', middleware.checkToken, async(req, res, err) => {

  const positionById  = await Position.findById(req.params.id)
  positionById.status = 'closed'
  await positionById.save()
  if (!positionById) {
    return err
  }
  return res.status(200)
            .send('Success');
});

module.exports = router;

const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/vacancies', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const Vacancy    = require('./Vacancy');
const Position   = require('../position/Position');
const middleware = require('../../middleware');

router.post('/create', middleware.checkToken, (req, res, err) => {

  let vacancy = new Vacancy(req.body);

  vacancy.save()
         .then((vacancy) => {
           return res.json('vacancy added successfully');
         })
         .catch(err => {
           console.log(err.message)
           return res.status(400)
                     .send(err.message);
         });
});

router.post('/create-from-proposal', middleware.checkToken, async (req, res, err) => {

  const positionById  = await Position.findById(req.body.proposalId, req.body, {new: true})
                                      .populate('position level', 'name-_id')
                                      .select('position level requirement requirements general amount skill skills status')
  positionById.status = 'reviewed'
  await positionById.save()
  if (!positionById) {
    return err
  }

  let skills       = positionById.skills.join("\n")
  let fullSkill    = positionById.skill.concat("\n", skills)
  let requirements = positionById.requirements.join("\n")
  let fullReq      = positionById.requirement.concat("\n", requirements, "\n", fullSkill)

  let vacancy = new Vacancy({
    topic:          positionById.level.name.concat(' ', positionById.position.name),
    vacancyName:    positionById.level.name.concat(' ', positionById.position.name),
    requirement:    fullReq,
    employmentType: 'Full-time',
    status:         'active'
  });

  vacancy.save()
         .then((vacancy) => {
           return res.status(200)
                     .send(vacancy._id);
         })
         .catch(err => {
           console.log(err.message)
           return res.status(400)
                     .send(err.message);
         });
});

router.get('/', middleware.checkToken, (req, res, err) => {

  Vacancy
    .find({})
    .sort({date: 'desc'})
    .populate('attachedFile', 'size filename name-_id')
    .exec(function (err, vacancies) {
      if (err) {
        console.log(err);
      }
      else {
        return res.status(200)
                  .send({list: vacancies});
      }
    })

});

router.get('/vacancy-names', middleware.checkToken, (req, res, err) => {

  Vacancy
    .find({})
    .select('vacancyName')
    .exec(function (err, items) {
      if (err) {
        console.log(err);
      }
      else {
        return res.status(200)
                  .send({list: items});
      }
    })
});

router.get('/:id', middleware.checkToken, (req, res, err) => {

  Vacancy.findById(req.params.id, req.body, {new: true})
         .populate('attachedFile')
         .exec(function (err, vacancy) {

           if (err) {
             console.log(err);
           }
           else {
             return res.status(200)
                       .send(vacancy);
           }

         })
});

router.put('/:id', (req, res) => {

  Vacancy.findByIdAndUpdate(req.params.id, req.body, {new: true})
         .exec(function (err, vacancy) {

           if (err) {
             console.log(err);
           }
           else {
             return res.status(200)
                       .send(vacancy);
           }

         })
});

router.delete('/:id', (req, res) => {
  Vacancy.findByIdAndRemove(req.params.id, (err, vacancy) => {
    if (err)
      return res
        .status(500)
        .send("There is a problem deleting a vacancy");
    res
      .status(200)
      .send("Vacancy " + vacancy.vacancyName + " was deleted");
  });
});

module.exports = router;

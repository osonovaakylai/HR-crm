const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose   = require('mongoose');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/interviews', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const Candidate  = require('../candidate/Candidate');
const Interview  = require('./Interview');
const middleware = require('../../middleware');

router.post('/create', middleware.checkToken, (req, res, err) => {

  let objectId  = mongoose.Types.ObjectId(req.body.email);
  let recipient = null

  Candidate.findById(objectId, (err, item) => {
    recipient = item.email;
  });

  let interview = new Interview(req.body);

  interview.save()
           .then((item) => {

             nodemailer.createTestAccount((err, account) => {
               let transporter = nodemailer.createTransport({
                 host:   'smtp.googlemail.com', // Gmail Host
                 port:   465, // Port
                 secure: true, // this is true as port is 465
                 auth:   {
                   user: 'osonovaakylai@gmail.com', //Gmail username
                   pass: 'ldmfj555' // Gmail password
                 }
               });

               let mailOptions = {
                 from:    '"Osonova Akylai" <osonovaakylai@gmail.com>',
                 to:      recipient, // Recepient email address. Multiple emails can send separated by commas
                 // to:      'akylai.osonova@zensoft.io', // Recepient email address. Multiple emails can send separated by commas
                 subject: 'Interview Invitation',
                 html:    "<div>" +
                          "<h3>Hello !</h3>" +
                          "<p>We are waiting for you to interview on April 3 at 13:00</p>" +
                          "<br/>" +
                          "<p>Sincerely</p>" +
                          "<p style='color: grey'>Rakhat Begalieva,</p>" +
                          "<p style='color: grey'>ZenSoft LLC</p>" +
                          "<p style='color: grey'>website: zensoft.io</p>" +
                          "<p style='color: grey'>facebook: https://www.facebook.com/zensoft.io</p>" +
                          "<p style='color: grey'>mobile: +996 557 050 622</p>" +
                          "<p style='color: grey'>Skype: rakhat.begalieva@outlook.com </p>" +
                          "</div>"
               };

               transporter.sendMail(mailOptions, (error, info) => {
                 if (error) {
                   return console.log(error);
                 }
                 console.log('Message sent: %s', info.messageId);
               });
             });

             return res.json('Interview added successfully');
           })
           .catch(err => {
             console.log(err.message)
             return res.status(400)
                       .send(err.message);
           });
});

router.get('/', middleware.checkToken, (req, res, err) => {

  Interview
    .find({})
    .sort({date: 'desc'})
    .populate('email vacancy', 'vacancyName email')
    .exec(function (err, interviews) {
      if (err) {
        console.log(err);
      }
      else {
        return res.status(200)
                  .send({list: interviews});
      }
    })
});

router.get('/:id', middleware.checkToken, (req, res, err) => {

  Interview.findById(req.params.id, req.body, {new: true})
           .populate('email vacancy', 'vacancyName email')
           .exec(function (err, interview) {

             if (err) {
               console.log(err);
             }
             else {
               return res.status(200)
                         .send(interview);
             }

           })
});

router.put('/:id', (req, res) => {

  Interview.findByIdAndUpdate(req.params.id, req.body, {new: true})
           .populate('email vacancy', 'vacancyName email')
           .exec(function (err, interview) {

             if (err) {
               console.log(err);
             }
             else {
               return res.status(200)
                         .send(interview);
             }

           })
});

router.delete('/:id', (req, res) => {
  Interview.findByIdAndRemove(req.params.id, (err, vacancy) => {
    if (err)
      return res
        .status(500)
        .send("There is a problem deleting an interview");
    res
      .status(200)
      .send("Vacancy " + vacancy.vacancyName + " was deleted");
  });
});

module.exports = router;

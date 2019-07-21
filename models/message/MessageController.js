const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose   = require('mongoose');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/message', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

const middleware = require('../../middleware');

router.post('/send', middleware.checkToken, (req, res, err) => {

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
      to:      req.body.recipients, // Recepient email address. Multiple emails can send separated by commas
      // to:      'akylai.osonova@zensoft.io', // Recepient email address. Multiple emails can send separated by commas
      subject: req.body.topic,
      html:    "<div>" +
               "<p>" + req.body.message + "</p>" +
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
  return res.status(200)
            .send('Message successfully sended to recipient(s)')
});

module.exports = router;

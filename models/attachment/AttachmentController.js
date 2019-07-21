const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const multer     = require('multer')
const uuidv3 = require('uuid/v3');
const path = require('path');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use('/api/attachment', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, Accept");
  next();
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'folder')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv3(file.originalname, uuidv3.URL).concat(path.extname(file.originalname)))
  }
})

let upload = multer({ storage: storage }).single('file')

const Attachment = require('./Attachment');
const middleware = require('../../middleware');

router.post('/doAttachmentUpload', middleware.checkToken, (req, res, err) => {


  upload(req, res, function (err) {

    if (err instanceof multer.MulterError) {
      console.log('A Multer error occurred when uploading.')
      return res.status(500).json(err)
    } else if (err) {
      console.log('An unknown error occurred when uploading.')
      return res.status(500).json(err)
    }

    let data = {
      filename : req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size
    }
    const attachment = new Attachment(data);
    attachment.save((err) => {
      if (err) throw err;
      console.log('Attachment saved successfully!');
    });

    return res.status(200).send({id: attachment._id})
  })
});

router.get('/:id', (req, res, err) => {

  Attachment.findById(req.params.id, req.body, {new: true})
           .exec(function (err, candidate) {

             if (err) {
               console.log(err);
             }
             else {
               return res.sendFile(path.join(__dirname, `./folder/${candidate.filename}`));
             }

           })
});

module.exports = router;

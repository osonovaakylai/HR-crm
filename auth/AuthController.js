const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use('/api/auth', router);
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, x-requested-with, Content-Type, x-access-token");
  next();
});
const app = express();

const {OAuth2Client} = require('google-auth-library');

const jwt    = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const config = require('../config');

const User             = require('../models/user/User');
const Role             = require('../models/Role');
const Permission       = require('../models/Permission');
const DepartmentName   = require('../models/department-name/DepartmentName');
const CandidatesStatus = require('../models/candidate-status/CandidatesStatus');
const PositionName     = require('../models/position-name/PositionName');
const LevelName        = require('../models/level-name/LevelName');
const Interview        = require('../models/interview/Interview');
const LanguagePie      = require('../models/statistic/LanguagePie');
const ResumeLine       = require('../models/statistic/ResumeLine');
const Total            = require('../models/statistic/Total');
const middleware       = require('../middleware');

User.find({'email': 'admin@gmail.com'}, function (err, users) {
  if (users.length === 0) {
    const userAdmin = new User({
      email:         'admin@gmail.com',
      password:      'admin',
      work_position: 'Global Admin',
      role_number:   1
    });
    userAdmin.save((err) => {
      if (err) throw err;
    });

    const userAdminRole = new Role({
      name:        'GLOBAL_ADMIN',
      role_number: userAdmin.role_number,
    });
    userAdminRole.save((err) => {
      if (err) throw err;
    });

    const adminPermission = new Permission({
      role_number: userAdmin.role_number,
      list:        ['MANAGE_CREATE_POSITION_VIEW', 'MANAGE_VACANCY_FORM_VIEW', 'MANAGE_POSITIONS_VIEW', 'MANAGE_PROPOSALS_VIEW', 'MANAGE_VACANCIES_VIEW', 'MANAGE_CANDIDATES_VIEW', 'MANAGE_RESERVE_VIEW', 'MANAGE_INTERNS_VIEW', 'MANAGE_INTERVIEWS_VIEW', 'MANAGE_SEND_MESSAGE_VIEW', 'MANAGE_STATISTICS_VIEW', 'MANAGE_INTERVIEW_FORM_VIEW', 'MANAGE_CANDIDATES_PROFILE_VIEW']
    });
    adminPermission.save((err) => {
      if (err) throw err;
    });
  }
});

User.find({'email': 'hr@gmail.com'}, function (err, users) {
  if (users.length === 0) {
    const userHr = new User({
      email:         'hr@gmail.com',
      password:      'hr',
      work_position: 'Hr manager',
      role_number:   2
    });
    userHr.save((err) => {
      if (err) throw err;
    });

    const userHrRole = new Role({
      name:        'HR',
      role_number: userHr.role_number,
    });
    userHrRole.save((err) => {
      if (err) throw err;
    });

    const hrPermission = new Permission({
      role_number: userHr.role_number,
      list:        ['MANAGE_VACANCY_FORM_VIEW', 'MANAGE_PROPOSALS_VIEW', 'MANAGE_VACANCIES_VIEW', 'MANAGE_CANDIDATES_VIEW', 'MANAGE_RESERVE_VIEW', 'MANAGE_INTERNS_VIEW', 'MANAGE_INTERVIEWS_VIEW', 'MANAGE_SEND_MESSAGE_VIEW', 'MANAGE_STATISTICS_VIEW', 'MANAGE_INTERVIEW_FORM_VIEW', 'MANAGE_CANDIDATES_PROFILE_VIEW']
    });
    hrPermission.save((err) => {
      if (err) throw err;
    });
  }
});

User.find({'email': 'head@gmail.com'}, function (err, users) {
  if (users.length === 0) {
    const userHead = new User({
      email:         'head@gmail.com',
      password:      'head',
      work_position: 'Head of department',
      role_number:   3
    });
    userHead.save((err) => {
      if (err) throw err;
    });

    const userHeadRole = new Role({
      name:        'HEAD_OF_DEPARTMENT',
      role_number: userHead.role_number,
    });
    userHeadRole.save((err) => {
      if (err) throw err;
    });

    const headPermission = new Permission({
      role_number: userHead.role_number,
      list:        ['MANAGE_CREATE_POSITION_VIEW', 'MANAGE_POSITIONS_VIEW', 'MANAGE_INTERNS_VIEW', 'MANAGE_INTERVIEWS_VIEW', 'MANAGE_STATISTICS_VIEW', 'MANAGE_CANDIDATES_PROFILE_VIEW']
    });
    headPermission.save((err) => {
      if (err) throw err;
    });
  }
});

DepartmentName.find({}, function (err, departmentNames) {
  if (departmentNames.length === 0) {
    const departmentNames1 = new DepartmentName({
      name: 'Project Management',
    });
    departmentNames1.save((err) => {
      if (err) throw err;
    });
    const departmentNames2 = new DepartmentName({
      name: 'Administration',
    });
    departmentNames2.save((err) => {
      if (err) throw err;
    });
    const departmentNames3 = new DepartmentName({
      name: 'Dev Ops',
    });
    departmentNames3.save((err) => {
      if (err) throw err;
    });
    const departmentNames4 = new DepartmentName({
      name: 'QA',
    });
    departmentNames4.save((err) => {
      if (err) throw err;
    });
    const departmentNames5 = new DepartmentName({
      name: 'Development',
    });
    departmentNames5.save((err) => {
      if (err) throw err;
    });
  }
});

CandidatesStatus.find({}, function (err, list) {
  if (list.length === 0) {
    const status1 = new CandidatesStatus({
      name: 'review',
    });
    status1.save((err) => {
      if (err) throw err;
    });
    const status2 = new CandidatesStatus({
      name: 'intern',
    });
    status2.save((err) => {
      if (err) throw err;
    });
    const status3 = new CandidatesStatus({
      name: 'reserve',
    });
    status3.save((err) => {
      if (err) throw err;
    });
    const status4 = new CandidatesStatus({
      name: 'hired',
    });
    status4.save((err) => {
      if (err) throw err;
    });

  }
});

PositionName.find({}, function (err, names) {
  if (names.length === 0) {
    const name1 = new PositionName({
      name: 'Java',
    });
    name1.save((err) => {
      if (err) throw err;
    });
    const name2 = new PositionName({
      name: 'Python',
    });
    name2.save((err) => {
      if (err) throw err;
    });
    const name3 = new PositionName({
      name: 'Javascript',
    });
    name3.save((err) => {
      if (err) throw err;
    });
    const name4 = new PositionName({
      name: 'C#',
    });
    name4.save((err) => {
      if (err) throw err;
    });
  }
});

LevelName.find({}, function (err, names) {
  if (names.length === 0) {
    const name1 = new LevelName({
      name: 'Junior',
    });
    name1.save((err) => {
      if (err) throw err;
    });
    const name2 = new LevelName({
      name: 'Middle',
    });
    name2.save((err) => {
      if (err) throw err;
    });
    const name3 = new LevelName({
      name: 'Senior',
    });
    name3.save((err) => {
      if (err) throw err;
    });
    const name4 = new LevelName({
      name: 'Intern',
    });
    name4.save((err) => {
      if (err) throw err;
    });
  }
});

LanguagePie.find({}, function (err, list) {
  if (list.length === 0) {
    const data3 = new LanguagePie({
      value: 13,
      key:   "2018-07-01T12:36:02.584Z"
    });
    data3.save((err) => {
      if (err) throw err;
    });
  }
});

LanguagePie.find({}, function (err, list) {
  if (list.length === 0) {
    const data4 = new LanguagePie({
      value: 7,
      key:   "2018-08-01T12:36:02.584Z"
    });
    data4.save((err) => {
      if (err) throw err;
    });
  }
});

LanguagePie.find({}, function (err, list) {
  if (list.length === 0) {
    const data5 = new LanguagePie({
      value: 18,
      key:   "2018-09-01T12:36:02.584Z"
    });
    data5.save((err) => {
      if (err) throw err;
    });
  }
});

LanguagePie.find({}, function (err, list) {
  if (list.length === 0) {
    const data6 = new LanguagePie({
      value: 12,
      key:   "2018-10-01T12:36:02.584Z"
    });
    data6.save((err) => {
      if (err) throw err;
    });
  }
});

LanguagePie.find({}, function (err, list) {
  if (list.length === 0) {
    const data7 = new LanguagePie({
      value: 15,
      key:   "2018-11-01T12:36:02.584Z"
    });
    data7.save((err) => {
      if (err) throw err;
    });
  }
});

LanguagePie.find({}, function (err, list) {
  if (list.length === 0) {
    const data8 = new LanguagePie({
      value: 25,
      key:   "2018-12-01T12:36:02.584Z"
    });
    data8.save((err) => {
      if (err) throw err;
    });
  }
});

ResumeLine.find({}, function (err, list) {
  if (list.length === 0) {
    const data3 = new ResumeLine({
      value: 13,
      key:   "2018-07-01T12:36:02.584Z"
    });
    data3.save((err) => {
      if (err) throw err;
    });
  }
});

ResumeLine.find({}, function (err, list) {
  if (list.length === 0) {
    const data4 = new ResumeLine({
      value: 7,
      key:   "2018-08-01T12:36:02.584Z"
    });
    data4.save((err) => {
      if (err) throw err;
    });
  }
});

ResumeLine.find({}, function (err, list) {
  if (list.length === 0) {
    const data5 = new ResumeLine({
      value: 18,
      key:   "2018-09-01T12:36:02.584Z"
    });
    data5.save((err) => {
      if (err) throw err;
    });
  }
});

ResumeLine.find({}, function (err, list) {
  if (list.length === 0) {
    const data6 = new ResumeLine({
      value: 12,
      key:   "2018-10-01T12:36:02.584Z"
    });
    data6.save((err) => {
      if (err) throw err;
    });
  }
});

ResumeLine.find({}, function (err, list) {
  if (list.length === 0) {
    const data7 = new ResumeLine({
      value: 15,
      key:   "2018-11-01T12:36:02.584Z"
    });
    data7.save((err) => {
      if (err) throw err;
    });
  }
});

ResumeLine.find({}, function (err, list) {
  if (list.length === 0) {
    const data8 = new ResumeLine({
      value: 25,
      key:   "2018-12-01T12:36:02.584Z"
    });
    data8.save((err) => {
      if (err) throw err;
    });
  }
});


Total.find({}, function (err, list) {
  if (list.length === 0) {
    const total = new Total({
      interviews:    200,
      telInterviews: 50,
      hired:         210,
      totalCV:       100
    });
    total.save((err) => {
      if (err) throw err;
    });
  }
});

router.post('/register', (req, res) => {
  // const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
      email:    req.body.username,
      password: req.body.password
    },
    (err, user) => {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering a user");

      const token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400            //expires in 24 hours
      });
      res
        .status(200)
        .send({auth: true, token: token});
    });
});

router.post('/login', (req, res) => {

  User.findOne({email: req.body.username}, (err, user) => {

    if (err)
      return res
        .status(404)
        .send("No user found");

    // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (req.body.password !== user.password)
      return res
        .status(401)
        .send({auth: false, token: null});

    const token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: 86400  //expires in 24 hours
    });

    res
      .status(200)
      .send({auth: true, token: token});

  });
});

router.post('/auth/google', (req, res) => {

  const client = new OAuth2Client("");

  async function verify() {
    const ticket  = await client.verifyIdToken({
      idToken:  req.body.id_token,
      audience: "",  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid  = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
  }

  verify(() => {
    return res
      .status(200)
      .send('WORK');
  })
    .catch((rej) => {
      return res
        .status(401)
        .send({auth: false, token: null});
    });

  return res
    .status(200)
    .send('AUTHORIZED');
  // User.findOne('google-token', (err, user) => {
  //
  //   if (err)
  //     return res
  //       .status(404)
  //       .send("No user found");
  //
  //   // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  //   if (req.body.password !== user.password)
  //     return res
  //       .status(401)
  //       .send({auth: false, token: null});
  //
  //   const token = jwt.sign({id: user._id}, config.secret, {
  //     expiresIn: 86400  //expires in 24 hours
  //   });
  //
  //   res
  //     .status(200)
  //     .send({auth: true, token: token});
  //
  // });
});

router.get('/logout', (req, res) => {
  res
    .status(200)
    .send({auth: false, token: null});
});

router.get('/current-user', middleware.checkToken, (req, res, err) => {

  User.findById(req.decoded.id, (err, user) => {
    if (err) {
      return res
        .status(500)
        .send("There is a problem finding the user");
    }

    Role.findOne({'role_number': user.role_number}, (err, role) => {
      if (err) {
        throw err;
      }

      Permission.findOne({'role_number': user.role_number}, (err, permission) => {
        if (err) {
          throw err;
        }

        let response = {
          id:          user.id,
          email:       user.email,
          role:        role.name,
          permissions: permission.list
        };

        res.status(200)
           .send(response);

      });
    });
  });
});

module.exports = router;

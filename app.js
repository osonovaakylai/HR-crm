const express = require('express');
const app = express();
require('./db');

const path = require("path");

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

const UserController = require('./models/user/UserController');
app.use('/api/users', UserController);

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

const ProposalsController = require('./models/proposal/ProposalController');
app.use('/api/proposals', ProposalsController);

const PositionsController = require('./models/position/PositionController');
app.use('/api/positions', PositionsController);

const DepartmentNameController = require('./models/department-name/DepartmentNameController');
app.use('/api/department-names', DepartmentNameController);

const PositionNameController = require('./models/position-name/PositionNameController');
app.use('/api/position-names', PositionNameController);

const LevelNameController = require('./models/level-name/LevelNameController');
app.use('/api/level-names', LevelNameController);

const VacancyController = require('./models/vacancy/VacancyController');
app.use('/api/vacancies', VacancyController);

const InterviewController = require('./models/interview/InterviewController');
app.use('/api/interviews', InterviewController);

const StatisticController = require('./models/statistic/StatisticController');
app.use('/api/statistics', StatisticController);

const CandidateController = require('./models/candidate/CandidateController');
app.use('/api/candidates', CandidateController);

const CandidatesStatusController = require('./models/candidate-status/CandidatesStatusController');
app.use('/api/candidates-status', CandidatesStatusController);

const AttachmentController = require('./models/attachment/AttachmentController');
app.use('/api/attachment', AttachmentController);

const CandidatesListController = require('./models/candidates-list/CandidatesListController');
app.use('/api/candidates-list', CandidatesListController);

const RecipientListController = require('./models/recipient-list/RecipientListController');
app.use('/api/recipient-list', RecipientListController);

const MessageController = require('./models/message/MessageController');
app.use('/api/message', MessageController);

app.get("/api/files/:filename", (req, res) => {
  let filename = req.params.filename;
  return res.sendFile(filename, { root: path.join(__dirname, './folder') });
});

module.exports = app;

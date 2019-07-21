import ResultSet from './base/result'
import ResultList from './base/list'
import PositionRequestModel from '../models/position'
import VacanciesListModel from '../models/vacancies-list'
import CandidatesListModel from '../models/candidates-list'
import InterviewModel from '../models/interview'
import ProposalModel from '../models/proposal'
import PostsModel from '../models/posts'
import CandidatesModel from '../models/candidates'
import SendMessageModel from '../models/send-message'
import VacancyTemplateModel from '../models/vacancy-template'
import PositionNamesModel from '../models/position-names'
import DepartmentNamesModel from '../models/department-names'
import LevelNamesModel from '../models/level-names'
import CandidatesStatusModel from '../models/candidates-status'
import VacanciesModel from '../models/vacancies'
import {VacanciesRequest} from '../models/vacancies'
import {CandidatesRequest} from '../models/candidates'
import {CandidateInvite} from '../models/interview'
import StatisticsModel from '../models/statistics'
import {RecipientListMapper} from "../mappers";
import RecipientListModel from "../models/recipient-list";


export interface SendMessageResults {
  list: ResultSet<ResultList<SendMessageModel>, any>
}

export interface VacancyTemplateResults {
  template: ResultSet<VacancyTemplateModel, any>
}

export interface PositionResults {
  list: ResultSet<ResultList<PositionRequestModel>, any>
  position: ResultSet<PositionRequestModel, any>
}

export interface VacanciesResults {
  list: ResultSet<ResultList<VacanciesRequest.VacanciesListingModel>, any>
  vacancy: ResultSet<VacanciesModel, any>
}

export interface InterviewResults {
  list: ResultSet<ResultList<InterviewModel>, any>
  interview: ResultSet<InterviewModel, any>
}

export interface ProposalResults {
  list: ResultSet<ResultList<ProposalModel>, any>
}

export interface CandidatesListResults {
  list: ResultSet<ResultList<CandidatesListModel>, any>
}

export interface VacanciesListResults {
  list: ResultSet<ResultList<VacanciesListModel>, any>
}

export interface PostsResults {
  list: ResultSet<ResultList<PostsModel>, any>
}

export interface PositionNamesResults {
  name: ResultSet<PositionNamesModel, any>
  list: ResultSet<ResultList<PositionNamesModel>, any>
}

export interface DepartmentNamesResults {
  name: ResultSet<DepartmentNamesModel, any>
  list: ResultSet<ResultList<DepartmentNamesModel>, any>
}

export interface LevelNamesResults {
  name: ResultSet<LevelNamesModel, any>
  list: ResultSet<ResultList<LevelNamesModel>, any>
}

export interface RecipientListResults {
  name: ResultSet<RecipientListModel, any>
  list: ResultSet<ResultList<RecipientListModel>, any>
}

export interface CandidatesStatusResults {
  name: ResultSet<CandidatesStatusModel, any>
  list: ResultSet<ResultList<CandidatesStatusModel>, any>
}

export interface CandidatesResults {
  profile: ResultSet<CandidatesModel, any>
  list: ResultSet<ResultList<CandidatesRequest.CandidatesListingModel>, any>
}

export interface CandidateInviteResults {
  invite: ResultSet<CandidateInvite.CandidateInterviewInvite, any>
}

export interface StatisticsResults {
  resumeLine: ResultSet<StatisticsModel.ResumeLineList, any>
  languagePie: ResultSet<StatisticsModel.LanguagePieList, any>
  totals: ResultSet<StatisticsModel.Totals, any>
}

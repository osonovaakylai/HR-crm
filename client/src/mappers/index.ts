import PositionRequestModel from '../models/position'
import CandidatesListModel from '../models/candidates-list'
import VacanciesListModel from '../models/vacancies-list'
import InterviewModel from '../models/interview'
import ProposalModel from '../models/proposal'
import PostsModel from '../models/posts'
import DepartmentNamesModel from '../models/department-names'
import PositionNamesModel from '../models/position-names'
import CandidatesStatusModel from '../models/candidates-status'
import LevelNamesModel from '../models/level-names'
import VacancyTemplateModel from '../models/vacancy-template'
import CandidatesModel from '../models/candidates'
import VacanciesModel from '../models/vacancies'
import {VacanciesRequest} from '../models/vacancies'
import {CandidatesRequest} from '../models/candidates'
import StatisticsModel from '../models/statistics'
import ResultSet from '../results/base/result'
import ResultList from '../results/base/list'
import RecipientListModel from "../models/recipient-list";

export interface InterviewMapper {
  list: InterviewModel[]
  interview: InterviewModel
}

export interface VacancyTemplateMapper {
  template: VacancyTemplateModel
}

export interface SendMessageMapper {
}

export interface PositionMapper {
  list: PositionRequestModel[]
  position: PositionRequestModel
}

export interface VacanciesMapper {
  list: VacanciesRequest.VacanciesListingModel[]
  vacancy: VacanciesModel
}

export interface ProposalMapper {
  list: ProposalModel[]
}

export interface PostsMapper {
  all: ResultSet<ResultList<PostsModel>, any>
  list: PostsModel[]
}

export interface DepartmentNamesMapper {
  list: DepartmentNamesModel[]
}

export interface CandidatesStatusMapper {
  list: CandidatesStatusModel[]
}

export interface VacanciesListMapper {
  list: VacanciesListModel[]
}

export interface CandidatesListMapper {
  list: CandidatesListModel[]
}

export interface LevelNamesMapper {
  list: LevelNamesModel[]
}

export interface RecipientListMapper {
  list: RecipientListModel[]
}

export interface PositionNamesMapper {
  list: PositionNamesModel[]
}

export interface CandidatesMapper {
  list: CandidatesRequest.CandidatesListingModel[]
  profile: CandidatesModel
}

export interface StatisticsMapper {
  resumeLine: any
  languagePie: any
  totals: any
}

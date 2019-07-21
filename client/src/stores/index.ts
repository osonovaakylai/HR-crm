import {ResultStore} from './base'
import {
  PositionResults,
  PostsResults,
  PositionNamesResults,
  DepartmentNamesResults,
  LevelNamesResults,
  ProposalResults,
  CandidatesListResults,
  VacanciesListResults,
  InterviewResults,
  VacancyTemplateResults,
  SendMessageResults,
  CandidatesResults,
  CandidatesStatusResults,
  CandidateInviteResults,
  VacanciesResults,
  StatisticsResults,
  RecipientListResults
} from '../results'


export interface CandidatesStore extends ResultStore<CandidatesResults> {

}

export interface CandidatesListStore extends ResultStore<CandidatesListResults> {

}

export interface VacanciesListStore extends ResultStore<VacanciesListResults> {

}

export interface RecipientListStore extends ResultStore<RecipientListResults> {

}

export interface InterviewStore extends ResultStore<InterviewResults> {

}

export interface PositionStore extends ResultStore<PositionResults> {

}

export interface ProposalStore extends ResultStore<ProposalResults> {

}

export interface PostsStore extends ResultStore<PostsResults> {

}

export interface PositionNamesStore extends ResultStore<PositionNamesResults> {

}

export interface DepartmentNamesStore extends ResultStore<DepartmentNamesResults> {

}

export interface LevelNamesStore extends ResultStore<LevelNamesResults> {

}

export interface SendMessageStore extends ResultStore<SendMessageResults> {

}

export interface VacancyTemplateStore extends ResultStore<VacancyTemplateResults> {

}

export interface CandidatesStatusStore extends ResultStore<CandidatesStatusResults> {

}

export interface VacanciesStore extends ResultStore<VacanciesResults> {

}

export interface CandidateInviteStore extends ResultStore<CandidateInviteResults> {

}

export interface StatisticsStore extends ResultStore<StatisticsResults> {

}

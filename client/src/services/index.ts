import BaseService from './base/base'
import SendMessageModel from '../models/send-message'
import {CandidateInvite, InterviewRequest} from '../models/interview'
import InterviewModel from '../models/interview'
import {CurrentUser} from '../models/user'
import {PositionRequest} from '../models/position'
import VacanciesModel from '../models/vacancies'
import {AuthToken} from '../models/auth'
import {FileResult} from './impl/document'
import CandidatesModel from "../models/candidates";
import {RecipientListMapper} from "../mappers";

export interface AuthService extends BaseService {
  isLoggedIn: boolean

  getCurrentUser(): CurrentUser

  login(username: string, password: string): Promise<Response>

  register(username: string, password: string): Promise<Response>

  logout(): Promise<Response>

  // initPasswordReset(email: string): void

  // validateResetRequest(requestId: string): Promise<boolean>

  // resetPassword(requestId: string, newPassword: string): Promise<void>

  refreshCurrentUser(): Promise<void>

  isLogged(): boolean

  isAllowedTo(permissions: string[]): boolean

  setAuthToken(authToken: AuthToken): void
}

export interface DocumentService extends BaseService {
  upload(file: FileResult, onProgress: (event: any) => void): Promise<FileResult>

  uploadOnCreate(file: FileResult): Promise<FileResult>
}

export interface PositionService extends BaseService {
  createPosition(positionRequest: PositionRequest.CreatePosition): Promise<void>
  close(docId: string): Promise<void>
  list(queryParams: any): Promise<void>
  getById(posId: string): Promise<void>
  update(docId: string, positionRequest: PositionRequest.CreatePosition): Promise<void>
}

export interface InterviewService extends BaseService {
  list(): Promise<void>
  getById(interviewId: string): Promise<void>
  createInterview(interview: InterviewRequest.InterviewRequestModel): Promise<void>
  update(docId: string, interview: InterviewRequest.InterviewRequestModel): Promise<void>
  delete(id: string): void
}

export interface ProposalService extends BaseService {
  list(queryParams: any): Promise<void>
}

export interface CandidatesListService extends BaseService {
  list(): Promise<void>
}

export interface VacanciesListService extends BaseService {
  list(): Promise<void>
}

export interface PostsService extends BaseService {
  list(): void
}

export interface DepartmentNamesService extends BaseService {
  list(): Promise<void>
}

export interface PositionNamesService extends BaseService {
  list(): Promise<void>
}

export interface CandidatesStatusService extends BaseService {
  list(): Promise<void>
}

export interface LevelNamesService extends BaseService {
  list(): Promise<void>
}

export interface RecipientListService extends BaseService {
  list(): Promise<void>
}

export interface SendMessageService extends BaseService {
  sendMessage(message: SendMessageModel): Promise<Response>
}

export interface VacancyTemplateService extends BaseService {
  getTemplate(): Promise<void>
}

export interface CandidatesService extends BaseService {
  list(queryParams: any): Promise<void>
  getById(profileId: string): Promise<void>
  update(docId: string, profile: CandidatesModel): Promise<void>
  createProfile(profile: CandidatesModel): Promise<void>
  delete(id: string): void
}

export interface VacanciesService extends BaseService {
  createVacancy(vacancy: VacanciesModel): Promise<void>
  createVacancyFromProposal(proposalId: string): Promise<void>
  list(): void
  getById(vacId: string): Promise<void>
  update(docId: string, vacancy: VacanciesModel): Promise<void>
  delete(id: string): void
}

export interface CandidateInviteService extends BaseService {
  doInvite(CandidateInvite: CandidateInvite.CandidateInterviewInvite): Promise<Response>
}

export interface StatisticsService extends BaseService {

  resumeLine(): Promise<void>

  languagePie(): Promise<void>

  totals(): Promise<void>

}



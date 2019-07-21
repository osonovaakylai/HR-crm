import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'
import CandidatesListModel from "./candidates-list";

export default class InterviewModel extends UniqBaseModel {

  @observable
  _id: string

  @observable
  email: any

  @observable
  date: any

  @observable
  vacancy: any

  @observable
  interviewer: string

  @observable
  interviewers: string[]

  static of(json: Partial<InterviewModel>): InterviewModel {
    const model = new InterviewModel()
    for (const prop in json) {
      if (json.hasOwnProperty(prop)) {
        (model as any)[prop] = (json as any)[prop]
      }
    }
    return model
  }
}

export namespace CandidateInvite {
  export interface CandidateInterviewInvite {
    email: CandidatesListModel,
    place: string,
    message: string,
    datetime: any
  }
}

export namespace InterviewRequest {
  export interface InterviewRequestModel {
    _id: string | null,
    email: string | null,
    date: any,
    vacancy: string | null,
    interviewer: string,
    interviewers: string[]
  }
}

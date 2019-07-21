import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class CandidatesModel extends UniqBaseModel {

  @observable
  _id: string

  @observable
  firstname: string

  @observable
  lastname: string

  @observable
  email: string

  @observable
  phoneNumber: string

  @observable
  skype: string

  @observable
  department: any

  @observable
  experience: string

  @observable
  level: any

  @observable
  status: any

  @observable
  comment: any

  @observable
  date: any

  @observable
  attachedCV: any

  static of(json: Partial<CandidatesModel>): CandidatesModel {
    const model = new CandidatesModel()
    for (const prop in json) {
      if (json.hasOwnProperty(prop)) {
        (model as any)[prop] = (json as any)[prop]
      }
    }
    return model
  }
}

export namespace CandidatesRequest {
  export interface CandidatesListingModel {
    _id: string
    firstname: string,
    lastname: string,
    department: any
    vacancy: string,
    date: any,
    email: string,
    comment: any | null,
    attachedCV: any,
    status: any
  }
}

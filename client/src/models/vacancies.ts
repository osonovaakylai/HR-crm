import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class VacanciesModel extends UniqBaseModel {
  @observable
  _id: string

  @observable
  tarif: string

  @observable
  topic: string

  @observable
  vacancyName: string

  @observable
  city: string

  @observable
  requirement: string

  @observable
  optional: string

  @observable
  address: string

  @observable
  education: string

  @observable
  schedule: string

  @observable
  experience: string

  @observable
  condition: string

  @observable
  responsibility: string

  @observable
  other: string

  @observable
  salary: string

  @observable
  employmentType: string

  @observable
  socialMedia: any

  @observable
  attachedFile: any

  @observable
  status: string

  static of(json: Partial<VacanciesModel>): VacanciesModel {
    const model = new VacanciesModel()
    for (const prop in json) {
      if (json.hasOwnProperty(prop)) {
        (model as any)[prop] = (json as any)[prop]
      }
    }
    return model
  }
}

export namespace VacanciesRequest {
  export interface VacanciesListingModel {
    _id: any,
    vacancyName: string,
    date: any,
    schedule: string,
    status: string
  }
}

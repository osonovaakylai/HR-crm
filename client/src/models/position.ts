import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class PositionRequestModel extends UniqBaseModel {

  @observable
  _id: any

  @observable
  department: any

  @observable
  amount: number

  @observable
  position: any

  @observable
  requirement: string

  @observable
  requirements: string[]

  @observable
  skill: string

  @observable
  skills: string[]

  @observable
  level: any

  @observable
  general: string

  @observable
  date: any

  @observable
  status: string

  static of(json: Partial<PositionRequestModel>): PositionRequestModel {
    const model = new PositionRequestModel()
    for (const prop in json) {
      if (json.hasOwnProperty(prop)) {
        (model as any)[prop] = (json as any)[prop]
      }
    }
    return model
  }
}

export namespace PositionRequest {
  export interface CreatePosition {
    department: string | null,
    amount: number,
    position: string | null,
    requirement: string | null,
    requirements: any | null,
    skills:  any | null,
    skill: string | null,
    level: string | null,
    general: string | null,
    status: string | null,
    creator: string | null
  }
}

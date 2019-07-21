import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class VacancyTemplateModel extends UniqBaseModel {

  @observable
  description: string

  static of(json: Partial<VacancyTemplateModel>): VacancyTemplateModel {
    const model = new VacancyTemplateModel()
    for (const prop in json) {
      if (json.hasOwnProperty(prop)) {
        (model as any)[prop] = (json as any)[prop]
      }
    }
    return model
  }
}
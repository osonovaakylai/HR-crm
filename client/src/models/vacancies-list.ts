import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class VacanciesListModel extends UniqBaseModel {

  @observable
  name: string
}
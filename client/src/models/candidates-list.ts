import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class CandidatesListModel extends UniqBaseModel {

  @observable
  _id: string

  @observable
  email: string
}

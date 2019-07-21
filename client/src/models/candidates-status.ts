import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class CandidatesStatusModel extends UniqBaseModel {

  @observable
  name: string
}

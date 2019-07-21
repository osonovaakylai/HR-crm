import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class ProposalModel extends UniqBaseModel {

  @observable
  _id: any

  @observable
  creator: string

  @observable
  position: any

  @observable
  date: any

  @observable
  amount: string

  @observable
  status: string
}

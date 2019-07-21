import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class RecipientListModel extends UniqBaseModel {

  @observable
  _id: any

  @observable
  email: string
}

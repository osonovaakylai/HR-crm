import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class SendMessageModel extends UniqBaseModel {

  @observable
  theme: string

  @observable
  recipient: any

  @observable
  message: string

  @observable
  link: string

}

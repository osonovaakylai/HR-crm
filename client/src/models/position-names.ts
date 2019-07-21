import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class PositionNamesModel extends UniqBaseModel {

  @observable
  name: string
}
import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class DepartmentNamesModel extends UniqBaseModel {

  @observable
  _id: any

  @observable
  name: string
}

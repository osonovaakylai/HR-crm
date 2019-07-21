import {observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class PostsModel extends UniqBaseModel {

  @observable
  userId: number

  @observable
  title: string

  @observable
  body: string

  constructor (
    userId: number,
    title: string,
    body: string ) {
    super()
    this.userId = userId
    this.title = title
    this.body = body
  }
}

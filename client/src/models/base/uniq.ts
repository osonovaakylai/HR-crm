import SimpleBaseModel from './simple'

export default class UniqBaseModel extends SimpleBaseModel {
  id = Math.random().toString()
}
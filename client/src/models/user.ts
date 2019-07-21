import {computed, observable} from 'mobx'
import UniqBaseModel from './base/uniq'

export default class User extends UniqBaseModel {

  @observable
  firstName: string

  @observable
  lastName: string

  @observable
  email: string

  @observable
  role: any

  @observable
  phone: string | null

  @observable
  status: string

  @computed
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  static of(json: Partial<User>): User {
    const model = new User()
    for (const prop in json) {
      if (json.hasOwnProperty(prop)) {
        (model as any)[prop] = (json as any)[prop]
      }
    }
    return model
  }
}

export namespace UserRequest {
  export interface Update {
    firstName: string
    lastName: string
    phone: string | null
  }
}

export class CurrentUser {

  @observable
  email: string

  @observable
  id: string

  @observable
  role: string

  @observable
  permissions: string[]
}

export class LoginResponse {
  @observable
  auth: boolean

  @observable
  token: string
}

export class UserRole {
  @observable
  id: string

  @observable
  name: string
}

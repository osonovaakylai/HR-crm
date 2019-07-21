import {observable} from "mobx";

export class AuthToken {
  @observable
  auth: boolean

  @observable
  token: string
}

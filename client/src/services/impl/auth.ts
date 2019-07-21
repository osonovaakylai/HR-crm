import {
  AuthService
} from '../index'
import {Fetcher} from '../../fetchers'
import {
  injectable,
  injectOnMethod
} from '../../common/annotations/common'

import {LoginResponse, CurrentUser} from '../../models/user'
import {AuthToken} from '../../models/auth'
import BaseService from '../base/base'
import {
  action,
  observable,
  runInAction
} from 'mobx'
import Pathes from '../../dicts/pathes'

@injectable('AuthService')
export default class DefaultAuthService extends BaseService implements AuthService {

  private fetcher: Fetcher

  @observable
  private loginResponse?: LoginResponse

  @observable
  private currentUser?: CurrentUser

  @observable
  private authToken?: AuthToken

  @observable
  isLoggedIn: boolean = false

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  async postConstructor() {
    // sessionStorage.removeItem('jwtToken')
    try {
      return await this.refreshCurrentUser()
    } catch {
    }
  }

  async login(username: string, password: string) {
    const response = await this.fetcher.post(
      Pathes.Auth.login,
      {
        username,
        password
      }
    )
    if (!response.ok) {
      runInAction(() => this.isLoggedIn = false)
      return response
    }

    const loginResponse: LoginResponse = await response.json()

    if (loginResponse) {
      this.setAuthToken(loginResponse)
      this.setCurrentUser(await this.fetchCurrentUser())
      runInAction(() => this.isLoggedIn = true)
    } else {
      runInAction(() => this.isLoggedIn = false)
    }
    return response
  }

  async register(username: string, password: string) {
    const response = await this.fetcher.post(
      Pathes.Auth.register,
      {
        username,
        password
      }
    )

    const authToken: AuthToken = await response.json()

    if (authToken) {
      this.setAuthToken(authToken)
    }

    if (response) {
      return response
    }
    throw new Error('failed to register')

  }

  async logout() {
    sessionStorage.removeItem('jwtToken')
    return await this.fetcher.get(Pathes.Auth.logout)
  }

  async refreshCurrentUser() {
    try {
      this.setCurrentUser(await this.fetchCurrentUser())
      runInAction(() => this.isLoggedIn = true)
    } catch {
      runInAction(() => this.isLoggedIn = false)
    }
  }

  async fetchCurrentUser(): Promise<CurrentUser> {
    let jwtToken = sessionStorage.getItem('jwtToken')
    if(jwtToken || jwtToken !== '') {
      const response = await this.fetcher.get(Pathes.Auth.currentUser, {}, {'x-access-token': jwtToken})
      if (response.ok) {
        return response.json()
      }
      throw new Error('not authorized')
    } else {
      throw new Error('not authorized')
    }
  }

  getCurrentUser() {
    const currentUser = this.currentUser;
    if (!currentUser) {
      throw new Error('not authorized')
    }
    return currentUser
  }

  @action
  private setCurrentUser(currentUser: CurrentUser) {
    this.currentUser = currentUser
  }

  @action
  public setAuthToken(authToken: AuthToken) {
    this.authToken = authToken
    sessionStorage.setItem('jwtToken', authToken.token)
  }

  isAllowedTo(requiredPermissions: string[]) {
    const currentUser = this.getCurrentUser()
    if (currentUser) {
      return requiredPermissions.every(it => currentUser.permissions.includes(it))
    }
    return false
  }

  @action
  isLogged() {
    return this.isLoggedIn
  }
}

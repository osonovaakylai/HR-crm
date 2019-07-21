import {AuthService, RecipientListService} from '../index'
import {RecipientListStore} from '../../stores'
import {
  injectable,
  injectOnMethod,
  injectOnProperty, instanceRegistry
} from '../../common/annotations/common'
import BaseService from '../base/base'
import Pathes from '../../dicts/pathes'
import {Fetcher} from '../../fetchers'
import {observable, runInAction} from 'mobx'

@injectable('RecipientListService')
export default class DefaultRecipientListService extends BaseService implements RecipientListService {

  private fetcher: Fetcher

  constructor(@injectOnProperty('RecipientListStore') private store: RecipientListStore) {
    super()
  }

  @injectOnMethod('Fetcher')
  setFetcher(fetch: Fetcher) {
    this.fetcher = fetch
  }

  @observable
  private authService: AuthService = instanceRegistry.get('AuthService')

  async list() {
    let jwtToken = sessionStorage.getItem('jwtToken')
    if (jwtToken || jwtToken !== '') {

      const response = await this.fetcher.get(Pathes.RecipientList.all, {}, {'x-access-token': jwtToken})

      const all = await response.json()
      this.store.load('list', all)

    } else {
      runInAction(() => {
        this.authService.isLoggedIn = false
      })
      throw new Error('not authorized')
    }
  }
}
